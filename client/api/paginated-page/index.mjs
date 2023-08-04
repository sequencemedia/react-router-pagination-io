export const paginatedPage = ({ page }) => fetch('/api/'.concat(page)).then((response) => response.json())
