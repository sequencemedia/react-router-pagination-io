require('@babel/register')

const path = require('path')

const nconf = require('nconf')

const Hapi = require('@hapi/hapi')
// const Boom = require('@hapi/boom')
const inert = require('@hapi/inert')
const vision = require('@hapi/vision')

const hogan = require('hapi-hogan')

const modulePath = process.cwd()
// const clientPath = path.resolve(modulePath, 'client')
const serverPath = path.resolve(modulePath, 'server')
const publicPath = path.resolve(modulePath, 'public')
const configPath = path.resolve(serverPath, 'config')
const assetsPath = path.resolve(publicPath, 'assets')

const config = require(configPath)()

const {
  good
} = require(path.join(configPath, 'good'))
/*
const {
  configureStore
} = require(path.join(clientPath, 'app/store'))

const {
  Renderer
} = require('redux-routes-renderer')

const {
  Routes
} = require(path.join(clientPath, 'app/components'))

const badImplementation = (e) => {
  console.error(e)

  return Boom.badImplementation()
}
*/
nconf
  .argv().env()
  .defaults(config)

async function start ({ host = 'localhost', port = 5000 }) {
  const server = Hapi.server({ host, port })

  // const renderer = new Renderer()

  const handler = ({ params: { page = 0 }, url: { pathname = '/' } }, h) => h.view('index') /* (
    renderer.render(configureStore({ paginatedPage: { page } }), Routes, pathname)
      .then(({ rendered: app, state }) => h.view('index', { app, state: JSON.stringify(state) }))
      .catch(badImplementation)
  ) */

  await server.register([good, inert, vision])

  server.views({
    relativeTo: modulePath,
    path: path.join(serverPath, 'views'),
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
      handler
    }, {
      method: '*',
      path: '/{page}',
      handler
    }, {
      method: '*',
      path: '/api/{page}',
      handler: ({ params: { page } }) => ({ page })
    }
  ])

  await server.start()

  console.log(`\nreact-router-pagination [${server.info.uri}]\n`)
}

start(nconf.get('server'))
