import {
  REQUEST_PAGE,
  REQUEST_PAGE_SUCCEEDED,
  REQUEST_PAGE_FAILED
} from 'react-router-pagination-io/client/app/actions/paginated-page'

export default function paginatedPageReducer (state = {}, { type, ...action } = {}) {
  switch (type) {
    case REQUEST_PAGE:

      return { ...state, ...action }
    case REQUEST_PAGE_SUCCEEDED:

      return { ...state, ...action }
    case REQUEST_PAGE_FAILED:

      return { ...state, ...action }
    default:

      return state
  }
}
