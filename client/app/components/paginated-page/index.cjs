const {
  connect
} = require('react-redux')

const Pagination = require('react-router-pagination')

const {
  TOTAL_ITEMS,
  ITEMS_PER_PAGE
} = require('#client/app/constants')

const Component = require('./component.cjs')

module.exports = connect(({ paginatedPage: { page } }) => {
  const totalPages = Pagination.calculateTotalPages(TOTAL_ITEMS, ITEMS_PER_PAGE)
  const pageNumber = Pagination.calculatePageNumber(page, totalPages)

  return {
    pageNumber
  }
})(Component)
