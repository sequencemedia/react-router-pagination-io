import { compose, createStore, applyMiddleware } from 'redux'
import promiseMiddleware from './PromiseMiddleware'
import reducers from '../reducers'

export const configureStore = (initialState) => createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(promiseMiddleware), (f) => f
  )
)

