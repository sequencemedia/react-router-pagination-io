import {
  connect
} from 'react-redux'

import {
  withRouter
} from 'react-router'

import Pagination from 'react-router-pagination'

import { requestPage } from 'react-router-pagination-io/client/app/actions/paginated-page'

import {
  TOTAL_ITEMS,
  ITEMS_PER_PAGE,
  SPREAD
} from 'react-router-pagination-io/client/app/constants'

import Component from './component'

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
