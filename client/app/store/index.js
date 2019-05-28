import {
  createStore,
  compose,
  applyMiddleware
} from 'redux'

import createSagaMiddleware from 'redux-saga'

import reducers from 'react-router-pagination-io/client/app/reducers'
import sagas from 'react-router-pagination-io/client/app/sagas'

export const configureStore = (initialState) => {
  /*
   *  Create the Saga middleware
   */
  const sagaMiddleware = createSagaMiddleware()

  /*
   *  Mount the Store and the Saga middleware
   */
  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(sagaMiddleware)
    )
  )

  /*
   *  Run the Sagas
   */
  sagaMiddleware.run(sagas)

  return store
}
