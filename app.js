require('module-alias/register')
require('@babel/register')

const path = require('path')

const nconf = require('nconf')

const Hapi = require('@hapi/hapi')
const Boom = require('@hapi/boom')
const inert = require('@hapi/inert')
const vision = require('@hapi/vision')

const Handlebars = require('handlebars')

const {
  render
} = require('react-router-redux-render')

const modulePath = process.cwd()
const serverPath = path.resolve(modulePath, 'server')
const publicPath = path.resolve(modulePath, 'public')
const assetsPath = path.resolve(publicPath, 'assets')

const config = require('react-router-pagination-io/server/config')()

const {
  good
} = require('react-router-pagination-io/server/config/good')

const {
  configureStore
} = require('react-router-pagination-io/client/app/store')

const { default: routes } = require('react-router-pagination-io/client/app/routes')

const error = (e) => {
  console.error(e)

  return (Boom.isBoom(e))
    ? e
    : Boom.boomify(e, { statusCode: 500, message: 'Server error in React Router Pagination' })
}

nconf
  .argv().env()
  .defaults(config)

async function start ({ host = 'localhost', port = 5000 }) {
  const server = Hapi.server({ host, port })

  const handler = ({ params: { page = 0 }, url: { pathname = '/' } }, h) => {
    const state = { paginatedPage: { page } }

    return (
      render(configureStore(state), routes, pathname)
        .then((app) => h.view('index', { app, state }))
        .catch(error)
    )
  }

  await server.register([good, inert, vision])

  server.views({
    relativeTo: modulePath,
    path: path.join(serverPath, 'views'),
    engines: {
      html: {
        module: Handlebars,
        helpersPath: path.join(serverPath, 'views/helpers'),
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
      handler: ({ params: { page } }) => ({ paginatedPage: { page } })
    }
  ])

  await server.start()

  console.log(`\nreact-router-pagination [${server.info.uri}]\n`)
}

start(nconf.get('server'))
