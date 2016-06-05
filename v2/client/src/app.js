import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from '../app/components'
import { Provider } from 'react-redux'
import { configureStore } from '../app/store'

const store = configureStore(window.initialState)

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('app')
)
