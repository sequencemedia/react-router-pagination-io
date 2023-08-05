import React from 'react'
import {
  useParams,
  Link
} from 'react-router-dom'

import Pagination from '#client/app/components/common/pagination'

function PaginatedPage () {
  const { pageNumber } = useParams()

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

export default PaginatedPage
