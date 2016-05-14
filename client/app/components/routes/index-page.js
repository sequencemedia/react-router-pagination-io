import React from 'react'
import Pagination from 'react-router-pagination'

export default () => (
  <section>
    <h1>Pagination (Index Page)</h1>
    <Pagination totalPages={12} pageNumber={1} spread={5} />
  </section>
)
