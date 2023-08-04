import React from 'react'
import {
  hydrateRoot
} from 'react-dom/client'
import {
  Provider
} from 'react-redux'

import Router from './app/router/index.jsx'

import {
  configureStore
} from './app/store/index.mjs'

const state = JSON.parse(document.getElementById('initial-state').textContent || '{}')
const store = configureStore(state)

function App () {
  return (
    <Provider store={store}>
      {Router}
    </Provider>
  )
}

const app = document.getElementById('app')

hydrateRoot(
  app,
  <App />
)
