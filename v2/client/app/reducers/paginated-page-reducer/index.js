import {
  GET_PAGE
} from 'react-router-pagination-io/client/app/actions/paginated-page-actions'

export default function paginatedPageReducer (state = {}, { type, r: { data } = {} } = {}) {
  switch (type) {
    case GET_PAGE:
      return { ...data }
    default:
      return state
  }
}
