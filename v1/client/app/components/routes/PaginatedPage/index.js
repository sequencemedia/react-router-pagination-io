import React from 'react'
import { Link } from 'react-router'
import Pagination, { pagination } from 'react-router-pagination'

export default (props) => {
  const {
    page 
  } = props.params
  
  const totalPages = pagination.calculateTotalPages(120, 10)
  const pageNumber = pagination.calculatePageNumber(page, totalPages)
  const spread = 5
  
  return (
    <section>
    <h1>Pagination (Page {pageNumber})</h1>
      <Pagination
        totalPages={totalPages}
        pageNumber={pageNumber}
        spread={spread}
        format='center'
        onClick={this.handleClick}
      />
      <nav>
        <p>Return to the <Link to='/'>index page</Link>.</p>
      </nav>
    </section>
  )
}
