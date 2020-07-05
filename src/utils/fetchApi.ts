export const fetchApi = async (endpoint: string, options = {}) => {
  const response = await fetch(`http://localhost:3333${endpoint}`, {
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
    ...options,
  });

  const data = await response.json();
  if (response.ok) return data;
};
