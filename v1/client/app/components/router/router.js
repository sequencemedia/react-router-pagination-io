import React from 'react'
import {
  Router,
  browserHistory
} from 'react-router'

import Routes from '../routes/routes'

export default () => ( // HAS a function
  <Router history={browserHistory}>
    {Routes}
  </Router>
)
