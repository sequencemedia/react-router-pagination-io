import React from 'react'
import {
  Routes,
  Route
} from 'react-router'

import IndexPage from '#client/app/components/index-page'
import PaginatedPage from '#client/app/components/paginated-page'

export default (
  <Routes>
    <Route exact path='/' element={<IndexPage />} />
    <Route path='/:pageNumber' element={<PaginatedPage />} />
  </Routes>
)
