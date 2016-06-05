import React from 'react'
import { Route, IndexRoute } from 'react-router'

import IndexPath from './IndexPath'
import IndexPage from './IndexPage'
import PaginatedPage from './PaginatedPage'

export default (
  <Route path='/' component={IndexPath}>
    <IndexRoute component={IndexPage} />
    <Route path=':page' component={PaginatedPage} />
  </Route>
)
