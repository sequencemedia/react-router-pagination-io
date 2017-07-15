/* eslint react/prop-types: 0 */
import React from 'react'
import {
  Link
} from 'react-router'
import Pagination from 'react-router-pagination'

export default ({ params: { page } }) => {
  const totalPages = Pagination.calculateTotalPages(120, 10)
  const pageNumber = Pagination.calculatePageNumber(page, totalPages)
  const spread = 5

  return (
    <section>
      <h1>Pagination (Page {pageNumber})</h1>
      <Pagination
        totalPages={totalPages}
        pageNumber={pageNumber}
        spread={spread}
        format='center'
      />
      <nav>
        <p>Return to the <Link to='/'>index page</Link>.</p>
      </nav>
    </section>
  )
}
