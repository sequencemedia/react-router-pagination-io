import React from 'react'
import PropTypes from 'prop-types'
import {
  connect
} from 'react-redux'
import {
  Link
} from 'react-router'
import Pagination, {
  pagination
} from 'react-router-pagination'

import * as PaginatedPageActions from '../../../actions/paginated-page-actions'

class PaginatedPage extends React.Component {
  componentWillMount () {
    const {
      paginatedPage
    } = this.props

    if (paginatedPage.page) return

    const {
      dispatch,
      params
    } = this.props

    dispatch(PaginatedPageActions.getPage(params))
  }

  handleClick = (page) => this.props.dispatch(PaginatedPageActions.getPage({ page }))

  render () {
    const {
      paginatedPage,
      params
    } = this.props

    const totalPages = pagination.calculateTotalPages(120, 10)
    const pageNumber = pagination.calculatePageNumber(params.page, totalPages)
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
          {(() => {
            if (paginatedPage.page) {
              return (
                <p>Redux has state for page {paginatedPage.page}.</p>
              )
            }
          })()}
        </nav>
      </section>
    )
  }
}

PaginatedPage.propTypes = {
  paginatedPage: PropTypes.shape({
    page: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  }),
  params: PropTypes.shape({
    page: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  }),
  dispatch: PropTypes.func
}

PaginatedPage.defaultProps = {
  paginatedPage: {},
  params: {},
  dispatch: () => {}
}

export default connect(
  ({ paginatedPage }) => ({ paginatedPage })
)(PaginatedPage)
