import { compose, createStore, applyMiddleware } from 'redux'
import promiseMiddleware from './PromiseMiddleware'
import reducers from '../reducers'

export function configureStore (initialState) {
  return createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(promiseMiddleware), (f) => f
    )
  )
}
