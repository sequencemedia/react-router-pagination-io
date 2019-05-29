import fetch from 'isomorphic-fetch'

export const paginatedPage = ({ page }) => fetch(`/api/${page}`).then((response) => response.json())
