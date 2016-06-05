import {
  GET_PAGE
} from '../../actions/PaginatedPageActions'

/**
 * Header Reducers
 */
export default function paginatedPageReducer (state = {}, action) {
  switch (action.type) {
    case GET_PAGE:
      return {
        ...state,
        ...action.r.data
      }
    default:
      return state
  }
}
