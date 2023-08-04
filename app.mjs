import debug from 'debug'

import path from 'path'

import nconf from 'nconf'

import Hapi from '@hapi/hapi'
import Boom from '@hapi/boom'
import inert from '@hapi/inert'
import vision from '@hapi/vision'

import Handlebars from 'handlebars'

import {
  renderToString
} from '@sequencemedia/react-router-redux-render'

import config from '#server/config'

import {
  configureStore
} from '#client/app/store'

import routes from '#client/app/routes'

const {
  env: {
    DEBUG = 'react-router-pagination-io'
  } = {}
} = process

debug.enable(DEBUG)

const log = debug('react-router-pagination-io')

log('`react-router-pagination-io` is awake')

const modulePath = process.cwd()
const serverPath = path.resolve(modulePath, 'server')
const publicPath = path.resolve(modulePath, 'public')
const assetsPath = path.resolve(publicPath, 'assets')

function error (e) {
  log(e)

  return (Boom.isBoom(e))
    ? e
    : Boom.boomify(e, { statusCode: 500, message: 'Server error in React Router Pagination' })
}

nconf
  .argv().env()
  .defaults(config)

async function start ({ host = 'localhost', port = 5000 } = {}) {
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
      handler (request, h) {
        return h.redirect('/assets/favicon.ico')
      }
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
    },
    {
      method: '*',
      path: '/{page?}',
      handler ({ params: { page = 0 }, url: { pathname = '/' } }, h) {
        return (
          fetch(`${server.info.uri}/api/${page}`)
            .then((response) => response.json())
            .then((state) => ({
              app: renderToString(configureStore(state), { location: pathname }, routes),
              state
            }))
            .then((context) => h.view('index', context))
            .catch(error)
        )
      }
    },
    {
      method: '*',
      path: '/api/{page}',
      handler ({ params: { page } }) {
        return { paginatedPage: { page } }
      }
    }
  ])

  await server.start()
}

start(nconf.get('server'))
