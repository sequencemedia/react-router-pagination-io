import React from 'react'
import PropTypes from 'prop-types'

import {
  Link
} from 'react-router-dom'

import Pagination from 'react-router-pagination-io/client/app/components/common/pagination'

const PaginatedPage = ({ pageNumber }) => (
  <section>
    <h1>Pagination (Page {pageNumber})</h1>
    <Pagination />
    <nav>
      <p>Return to the <Link to='/'>index page</Link>.</p>
      {do {
        if (pageNumber) {
        <>
          <p>Redux has state for page {pageNumber}.</p>
        </>
        }
      }}
    </nav>
  </section>
)

PaginatedPage.propTypes = {
  pageNumber: PropTypes.number.isRequired
}

export default PaginatedPage
