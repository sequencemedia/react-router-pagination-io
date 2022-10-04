import React , {useEffect , useState} from 'react'
import PropTypes from 'prop-types'

import {
  Link
} from 'react-router-dom'

import Pagination from 'react-router-pagination-io/client/app/components/common/pagination'
import { paginatedPage } from '../../../api/paginated-page'


const PaginatedPage = ({ pageNumber }) => {
  const [userInfo , setUserInfo] = useState([])
  const fetchData = async () => {
    const {data} = await paginatedPage(pageNumber);
    setUserInfo(data);
  };


  useEffect(() => {
    fetchData();
  }, [pageNumber]);
  return (
    <section>
      <h1>Pagination (Page {pageNumber})</h1>
      <Pagination/>
      <nav>
        <p>Return to the <Link to='/'>index page</Link>.</p>
        {do {
          if (pageNumber) {
            <p>Redux has state for page {pageNumber}.</p>
          }
        }}
        {userInfo[0] && userInfo.map(item=><li>{item.email}</li>)}
      </nav>
    </section>
  )
}

PaginatedPage.propTypes = {
  pageNumber: PropTypes.number.isRequired
}

export default PaginatedPage
