/**
 * Page actions
 */
import {
  request
} from 'react-router-pagination-io/client/app/actions'

/**
 * Action Types
 */
export const GET_PAGE = 'GET_PAGE'

/**
 * Action Creators
 */
export function getPage ({ page }) {
  return {
    type: GET_PAGE,
    promise: request.get(`/api/${page}`)
  }
}
