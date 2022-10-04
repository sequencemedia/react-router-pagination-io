import {
  REQUEST_PAGE_SUCCEEDED,
  REQUEST_PAGE_FAILED
} from 'react-router-pagination-io/client/app/actions/paginated-page'

const defaultState = {
  users: []
}

export default function paginatedPageReducer(state = defaultState, { type, ...action } = {}) {
  switch (type) {

    case "SET_USERS":
      return { ...state, users: action.payload }

    case REQUEST_PAGE_SUCCEEDED:

      return { ...state, ...action }
    case REQUEST_PAGE_FAILED:

      return { ...state, ...action }
    default:

      return state
  }
}
