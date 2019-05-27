import React from 'react'

import ReactRouterPagination from 'react-router-pagination'

const Pagination = ({
  totalPages,
  pageNumber,
  spread,
  handleClick
}) => (
  <ReactRouterPagination
    totalPages={totalPages}
    pageNumber={pageNumber}
    spread={spread}
    onClick={handleClick}
  />
)

export default Pagination

Pagination.propTypes = {
  ...ReactRouterPagination.propTypes
}

Pagination.defaultProps = {
  ...ReactRouterPagination.defaultProps
}
