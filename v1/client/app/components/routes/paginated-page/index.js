import React from 'react'
import PropTypes from 'prop-types'
import {
  Link
} from 'react-router'
import Pagination from 'react-router-pagination'

const Page = ({ params: { page = 0 } }) => {
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

Page.propTypes = {
  params: PropTypes.shape({
    page: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  })
}

Page.defaultProps = {
  params: { page: 0 }
}

export default Page
