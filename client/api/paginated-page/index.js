import fetch from 'isomorphic-fetch'

export const paginatedPage = ({ page }) => fetch('/api/'.concat(page)).then((response) => response.json())
