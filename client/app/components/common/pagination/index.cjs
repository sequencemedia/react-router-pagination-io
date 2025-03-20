const {
  connect
} = require('react-redux')

const Pagination = require('react-router-pagination')

const {
  requestPage
} = require('#client/app/actions/paginated-page')

const {
  TOTAL_ITEMS,
  ITEMS_PER_PAGE,
  SPREAD
} = require('#client/app/constants')

const withRouter = require('#client/app/components/common/with-router')

const Component = require('./component.cjs')

const mapStateToProps = ({ paginatedPage: { page } }, { match }) => {
  const totalPages = Pagination.calculateTotalPages(TOTAL_ITEMS, ITEMS_PER_PAGE)

  return {
    totalPages,
    pageNumber: Pagination.calculatePageNumber(page, totalPages),
    spread: SPREAD,
    match
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleClick (pageNumber) {
      return dispatch(requestPage(pageNumber))
    }
  }
}

const mergeProps = (props, dispatch) => {
  return {
    ...props,
    ...dispatch
  }
}

module.exports = withRouter(connect(mapStateToProps, mapDispatchToProps, mergeProps)(Component))
