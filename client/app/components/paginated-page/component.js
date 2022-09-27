import React from 'react'
import PropTypes from 'prop-types'

import {
  Link,
  useLocation
} from 'react-router-dom'

import Pagination from 'react-router-pagination-io/client/app/components/common/pagination'

const PaginatedPage = ({ pageNumber }) => {
  const location = useLocation()
  return (
    <section>
      <h1>Pagination (Page {location.pathname.split('/')[1]})</h1>
    <Pagination />
    <nav>
        <p>Return to the <Link to='/'>index page</Link>.</p>
        <p>Redux has state for page {location.pathname.split('/')[1]}.</p>
    </nav>
  </section>
  )
}

PaginatedPage.propTypes = {
  pageNumber: PropTypes.number.isRequired
}

export default PaginatedPage
