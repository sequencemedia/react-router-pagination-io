require('module-alias/register')
require('@babel/register')

const debug = require('debug')

const path = require('path')

const nconf = require('nconf')

const Hapi = require('@hapi/hapi')
const Boom = require('@hapi/boom')
const inert = require('@hapi/inert')
const vision = require('@hapi/vision')

const Handlebars = require('handlebars')

const fetch = require('isomorphic-fetch')

const {
  renderToString
} = require('@sequencemedia/react-router-redux-render')

const {
  env: {
    DEBUG = 'react-router-pagination-io'
  }
} = process

debug.enable(DEBUG)

const log = debug('react-router-pagination-io')

log('`react-router-pagination-io` is awake')

const modulePath = process.cwd()
const serverPath = path.resolve(modulePath, 'server')
const publicPath = path.resolve(modulePath, 'public')
const assetsPath = path.resolve(publicPath, 'assets')

const config = require('react-router-pagination-io/server/config')()

const {
  configureStore
} = require('react-router-pagination-io/client/app/store')

const {
  default: routes
} = require('react-router-pagination-io/client/app/routes')

const error = (e) => {
  log(e)

  return (Boom.isBoom(e))
    ? e
    : Boom.boomify(e, { statusCode: 500, message: 'Server error in React Router Pagination' })
}

nconf
  .argv().env()
  .defaults(config)

async function start ({ host = 'localhost', port = 5000 }) {
  const server = Hapi.server({ host, port })

  server.events.on('start', () => {
    const {
      info
    } = server

    log(info)
  })

  server.events.on('stop', () => {
    const {
      info
    } = server

    log(info)
  })

  const handler = ({ params: { page = 0 }, url: { pathname = '/' } }, h) => (
    fetch(`${server.info.uri}/api/${page}`)
      .then((response) => response.json())
      .then((state) => ({
        app: renderToString(configureStore(state), { location: pathname }, routes),
        state
      }))
      .then((context) => h.view('index', context))
      .catch(error)
  )

  await server.register([inert, vision])

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
      method: 'GET',
      path: '/favicon.ico',
      handler: (request, h) => h.redirect('/assets/favicon.ico')
    },
    {
      method: 'GET',
      path: '/assets/{path*}',
      handler: {
        directory: {
          path: path.normalize(assetsPath),
          listing: false,
          index: false
        }
      }
    }, {
      method: '*',
      path: '/{page?}',
      handler
    }, {
      method: '*',
      path: '/api/{page}',
      handler: ({ params: { page } }) => ({ paginatedPage: { page } })
    }
  ])

  await server.start()
}

start(nconf.get('server'))
