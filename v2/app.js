/* eslint-disable */
require('babel-register')

const path = require('path')

const nconf = require('nconf')

const Hapi = require('hapi')
const Good = require('good')
const Boom = require('boom')

const inert = require('inert')
const vision = require('vision')
const hogan = require('hapi-hogan')

const clientPath = path.resolve(__dirname, 'client')
const serverPath = path.resolve(__dirname, 'server')
const publicPath = path.resolve(__dirname, 'public')
const assetsPath = path.resolve(publicPath, 'assets')

const { configureStore } = require(path.resolve(clientPath, 'app/store'))
const { Renderer } = require('redux-routes-renderer')
const { Routes } = require(path.resolve(clientPath, 'app/components'))

const config = require(path.resolve(serverPath, 'config'))()
const server = new Hapi.Server()

const renderer = new Renderer()

const store = configureStore()

const good = {
  register: Good,
  options: {
    ops: {
      interval: 1000
    },
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ log: '*', response: '*' }]
      }, {
        module: 'good-console'
      }, 'stdout']
    }
  }
}

nconf.argv().env().defaults(config)

  server.connection(nconf.get('server:v2:connection'))

  server.register([good, inert, vision], (e) => {
    if (e) throw e

    server.views({
      relativeTo: __dirname,
      path: path.resolve(serverPath, 'views'),
      engines: {
        html: {
          module: hogan,
          compileMode: 'sync',
          compileOptions: {
            partialsPath: path.resolve(serverPath, 'views/partials'),
            isCached: true
          }
        }
      }
    })

    server.route({
      path: '/assets/{path*}',
      method: 'GET',
      handler: {
        directory: {
          path: path.normalize(assetsPath),
          listing: false,
          index: false
        }
      }
    })
    server.route({
      method: '*',
      path: '/',
      config: {
        handler: function ({ url: { path } }, reply) {
          renderer.render(store, Routes, path)
            .then(({ rendered, state }) => {
              reply.view('index', { title: 'React Router Pagination', react: rendered, state: JSON.stringify(state) })
            })
            .catch(reply)
        }
      }
    })
    server.route({
      method: '*',
      path: '/{page}',
      config: {
        handler: function ({ url: { path } }, reply) {
          renderer.render(store, Routes, path)
            .then(({ rendered, state }) => {
              reply.view('index', { title: 'React Router Pagination', react: rendered, state: JSON.stringify(state) })
            })
            .catch(reply)
        }
      }
    })
    server.route({
      method: '*',
      path: '/api/{page}',
      config: {
        handler: function ({ params: { page } }, reply) {
          reply({ page })
        }
      }
    })
    server.route({
      method: 'GET',
      path: '/favicon.ico',
      config: {
        handler: (request, reply) => {
          reply(Boom.notFound())
        }
      }
    })
  })

  server.start(() => {
    server.log('info', `[React.Router.Pagination] ${server.info.uri}`)
  })
