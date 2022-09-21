import fetch from "isomorphic-fetch";

export const paginatedPage = ({ page }) => {
  const query = new URLSearchParams({
    page,
  });
  return fetch(`https://reqres.in/api/users?${query}`).then((response) =>
    response.json()
  );
};
