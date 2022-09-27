import fetch from 'isomorphic-fetch'

export const paginatedPage = ({ page }) => fetch(`https://reqres.in/api/users?page=${page}`).then((response) => response.json()).then(data => console.log(data))
