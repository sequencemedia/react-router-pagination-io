import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  connect
} from 'react-redux'
import {
  Link
} from 'react-router'
import Pagination from 'react-router-pagination'

import * as PaginatedPageActions from 'react-router-pagination-io/client/app/actions/paginated-page-actions'

class PaginatedPage extends Component {
  handleClick = (page) => this.props.dispatch(PaginatedPageActions.getPage({ page }))

  render () {
    const {
      paginatedPage
    } = this.props

    const totalPages = Pagination.calculateTotalPages(120, 10)
    const pageNumber = Pagination.calculatePageNumber(paginatedPage.page, totalPages)
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
          {do {
            if (pageNumber) {
              <p>Redux has state for page {pageNumber}.</p>
            }
          }}
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
  dispatch: PropTypes.func
}

PaginatedPage.defaultProps = {
  paginatedPage: {},
  dispatch: () => {}
}

export default connect(({ paginatedPage }) => ({ paginatedPage }))(PaginatedPage)
