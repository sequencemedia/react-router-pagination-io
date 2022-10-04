import fetch from 'isomorphic-fetch'

// export const paginatedPage = ({ page }) => fetch(`/api/${page}`).then((response) => response.json())

const API_URL = 'https://reqres.in/api/';

export const paginatedPage = (page) => {return fetch(`${API_URL}users?page=${page}`).then(res => res.json()).catch((e) => (console.log(e)));};
