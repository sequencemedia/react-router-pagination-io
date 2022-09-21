import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import {
  Link
} from 'react-router-dom'

import Pagination from 'react-router-pagination-io/client/app/components/common/pagination'
import { paginatedPage } from '../../../api/paginated-page'

const PaginatedPage = ({ pageNumber }) => {
  const [people, setPerson] = useState([]);

  const fetchData = async () => {
    const data = await paginatedPage(pageNumber);

    setPerson(data.data);
  };

  useEffect(() => {
    fetchData();
  }, [pageNumber]);

  return (
    <section>
      <h1>Pagination (Page {pageNumber})</h1>
      <Pagination />
      <nav>
        <p>Return to the <Link to='/'>index page</Link>.</p>
        <p>Redux has state for {pageNumber}.</p>
      </nav>

      <p>
        <ul>
          {people &&
            people.map(person => (
              <li>{`${person.first_name}'s email: ${person.email}`}</li>
            ))
          }
        </ul>
      </p>
    </section>
  );
}

PaginatedPage.propTypes = {
  pageNumber: PropTypes.number.isRequired
}

export default PaginatedPage
