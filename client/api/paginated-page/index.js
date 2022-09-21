import fetch from 'isomorphic-fetch';

const API_URL = 'https://reqres.in/api/';

export const paginatedPage = (page) => {
  return fetch(`${API_URL}users?page=${page}`)
    .then(response => response.json())
    .catch(() => ({
      Response: 'False',
      Error: 'Page not found',
    }));
};
