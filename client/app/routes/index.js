import React from 'react'
import {
  Switch,
  Route
} from 'react-router-dom'

import IndexPage from 'react-router-pagination-io/client/app/components/index-page'
import PaginatedPage from 'react-router-pagination-io/client/app/components/paginated-page'

export default (
  <Switch>
    <Route exact path='/' component={IndexPage} />
    <Route path='/:pageNumber(\d+)' component={PaginatedPage} />
  </Switch>
)
