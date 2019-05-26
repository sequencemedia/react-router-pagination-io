import React from 'react'
import {
  Router,
  browserHistory
} from 'react-router'

import Routes from 'react-router-pagination-io/client/app/components/routes/routes'

export default ( // NOT a function
  <Router history={browserHistory}>
    {Routes}
  </Router>
)
