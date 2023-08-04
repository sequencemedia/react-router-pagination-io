import {
  connect
} from 'react-redux'

import reactRouterPagination from 'react-router-pagination'

import { requestPage } from '#client/app/actions/paginated-page'

import {
  TOTAL_ITEMS,
  ITEMS_PER_PAGE,
  SPREAD
} from '#client/app/constants'

import withRouter from '#client/app/components/common/with-router'

import Component from './component.cjs'

const {
  default: Pagination
} = reactRouterPagination

const mapStateToProps = ({ paginatedPage: { page } }, { match }) => {
  const totalPages = Pagination.calculateTotalPages(TOTAL_ITEMS, ITEMS_PER_PAGE)

  return {
    totalPages,
    pageNumber: Pagination.calculatePageNumber(page, totalPages),
    spread: SPREAD,
    match
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleClick: (pageNumber) => dispatch(requestPage(pageNumber))
})

const mergeProps = (props, dispatch) => ({
  ...props,
  ...dispatch
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps, mergeProps)(Component))
