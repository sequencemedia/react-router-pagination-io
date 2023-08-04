import {
  connect
} from 'react-redux'

import reactRouterPagination from 'react-router-pagination'

import {
  TOTAL_ITEMS,
  ITEMS_PER_PAGE
} from '#client/app/constants'

import Component from './component.cjs'

const {
  default: Pagination
} = reactRouterPagination

export default connect(({ paginatedPage: { page } }) => ({ pageNumber: Pagination.calculatePageNumber(page, Pagination.calculateTotalPages(TOTAL_ITEMS, ITEMS_PER_PAGE)) }))(Component)
