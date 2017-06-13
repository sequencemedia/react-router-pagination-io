import React from 'react'
import {
  Route,
  IndexRoute
} from 'react-router'

import IndexPage from './index-page'
import PaginatedPage from './paginated-page'

export default (
  <Route path='/'>
    <IndexRoute component={IndexPage} />
    <Route path=':page' component={PaginatedPage} />
  </Route>
)
