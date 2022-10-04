import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import Pagination from 'react-router-pagination-io/client/app/components/common/pagination'
import { useDispatch, useSelector } from 'react-redux'
import { paginatedPage } from '../../../api/paginated-page'

const PaginatedPage = ({ pageNumber }) => {
  const users = useSelector(state => state.paginatedPage.users)
  const dispatch = useDispatch();

  useEffect(() => {
    paginatedPage(pageNumber).then(respons => dispatch({ type: "SET_USERS", payload: respons.data }))
  }, [pageNumber])

  return (
    <section>
      <h1>Pagination (Page {pageNumber})</h1>
      <Pagination />
      <ul>
        {users !== undefined && users.map(user => <li>{`${user.first_name} ${user.last_name}`}</li>)}
      </ul>
    </section>
  )
}

PaginatedPage.propTypes = {
  pageNumber: PropTypes.number.isRequired
}

export default PaginatedPage
