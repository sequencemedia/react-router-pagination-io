import {
  connect
} from 'react-redux'

import Pagination from 'react-router-pagination'

import {
  TOTAL_ITEMS,
  ITEMS_PER_PAGE
} from '#client/app/constants'

import Component from './component.cjs'

export default connect(({ paginatedPage: { page } }) => {
  const totalPages = Pagination.calculateTotalPages(TOTAL_ITEMS, ITEMS_PER_PAGE)
  const pageNumber = Pagination.calculatePageNumber(page, totalPages)

  return {
    pageNumber
  }
})(Component)
