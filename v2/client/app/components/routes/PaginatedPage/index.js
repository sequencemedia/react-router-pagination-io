import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Pagination, { pagination } from 'react-router-pagination'

import * as PaginatedPageActions from '../../../actions/PaginatedPageActions'

class PaginatedPage extends React.Component {

  componentWillMount () {
    const {
      paginatedPage,
      dispatch,
      params
    } = this.props

    if (paginatedPage.page) return
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

PaginatedPage.needs = [
  PaginatedPageActions.getPage
]

export default connect(
  (state) => ({ paginatedPage: state.paginatedPage })
)(PaginatedPage)
