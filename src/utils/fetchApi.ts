export const fetchApi = async (endpoint: string, options = {}) => {
  const response = await fetch(`http://localhost:3333${endpoint}`, {
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
    ...options,
  });

  return response.ok && response.status !== 204
    ? await response.json()
    : response;
};
