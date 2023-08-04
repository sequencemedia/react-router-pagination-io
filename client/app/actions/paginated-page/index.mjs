/**
 * Action Types
 */
export const REQUEST_PAGE = 'REQUEST_PAGE'
export const REQUEST_PAGE_SUCCEEDED = 'REQUEST_PAGE_SUCCEEDED'
export const REQUEST_PAGE_FAILED = 'REQUEST_PAGE_FAILED'

/**
 * Action Creators
 */
export function requestPage (page) {
  return {
    type: REQUEST_PAGE,
    page
  }
}

export function requestPageSucceeded (page, paginatedPage) {
  return {
    type: REQUEST_PAGE_SUCCEEDED,
    page,
    paginatedPage
  }
}

export function requestPageFailed (page, error) {
  return {
    type: REQUEST_PAGE_FAILED,
    page,
    error
  }
}
