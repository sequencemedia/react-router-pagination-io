import {
  GET_PAGE
} from '../../actions/paginated-page-actions'

/**
 * Header Reducers
 */
export default function paginatedPageReducer (state = {}, { type, r: { data } = {} } = {}) {
  switch (type) {
    case GET_PAGE:
      return { ...data }
    default:
      return state
  }
}
