import React from 'react'
import PropTypes from 'prop-types'

import {
  Link
} from 'react-router-dom'

import Pagination from '#client/app/components/common/pagination'

function PaginatedPage ({ pageNumber }) {
  let content = null

  if (pageNumber) {
    content = (
      <p>Redux has state for page {pageNumber}.</p>
    )
  }

  return (
    <section>
      <h1>Pagination (Page {pageNumber})</h1>
      <Pagination />
      <nav>
        <p>Return to the <Link to='/'>index page</Link>.</p>
      </nav>
      {content}
    </section>
  )
}

PaginatedPage.propTypes = {
  pageNumber: PropTypes.number.isRequired
}

export default PaginatedPage
