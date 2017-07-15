require('babel-register')

const path = require('path')

const nconf = require('nconf')

const Hapi = require('hapi')
const Boom = require('boom')

const inert = require('inert')
const vision = require('vision')
const hogan = require('hapi-hogan')

const modulePath = process.cwd()

const clientPath = path.resolve(modulePath, 'client')
const serverPath = path.resolve(modulePath, 'server')
const publicPath = path.resolve(modulePath, 'public')
const configPath = path.resolve(serverPath, 'config')
const assetsPath = path.resolve(publicPath, 'assets')

const config = require(path.join(configPath))()

const {
  good
} = require(path.join(configPath, 'good'))
const {
  configureStore
} = require(path.join(clientPath, 'app/store'))
const {
  Renderer
} = require('redux-routes-renderer')
const {
  Routes
} = require(path.join(clientPath, 'app/components'))

const server = new Hapi.Server()

const renderer = new Renderer()

const store = configureStore()

nconf
  .argv().env()
  .defaults(config)

server.connection(nconf.get('server:v2:connection'))

server.register([good, inert, vision], (e) => {
  if (e) throw e

  server.views({
    relativeTo: modulePath,
    path: path.resolve(serverPath, 'views'),
    engines: {
      html: {
        module: hogan,
        compileMode: 'sync',
        compileOptions: {
          isCached: true
        }
      }
    }
  })

  server.route([
    {
      path: '/assets/{path*}',
      method: 'GET',
      handler: {
        directory: {
          path: path.normalize(assetsPath),
          listing: false,
          index: false
        }
      }
    }, {
      method: '*',
      path: '/',
      config: {
        handler: ({ url: { path } }, reply) => {
          renderer.render(store, Routes, path)
            .then(({ rendered: react, state }) => {
              reply.view('index', { react, state: JSON.stringify(state) })
            })
            .catch(reply)
        }
      }
    }, {
      method: '*',
      path: '/{page}',
      config: {
        handler: ({ url: { path } }, reply) => {
          renderer.render(store, Routes, path)
            .then(({ rendered: react, state }) => {
              reply.view('index', { react, state: JSON.stringify(state) })
            })
            .catch(reply)
        }
      }
    }, {
      method: '*',
      path: '/api/{page}',
      config: {
        handler: ({ params: { page } }, reply) => {
          reply({ page })
        }
      }
    }, {
      method: 'GET',
      path: '/favicon.ico',
      config: {
        handler: (request, reply) => {
          reply(Boom.notFound())
        }
      }
    }
  ])
})

server.start(() => {
  server.log('info', `[React.Router.Pagination/v2] ${server.info.uri}`)
})
