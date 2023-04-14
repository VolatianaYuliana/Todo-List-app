const load = async (method, endpoint, body = null) => {
  let data, error;
  try {
    const options = {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : null,
    };
    const response = await fetch(
      `${import.meta.env.VITE_SERVEUR}/${endpoint}`,
      options
    );
    if (!response.ok) {
      throw new Error("Unable to fetch data");
    }
    data = await response.json();
  } catch (err) {
    error = err.message;
  }

  return { data, error };
};

export const createData = async (endpoint, body) =>
  await load("POST", endpoint, body);
export const updateData = async (endpoint, body) =>
  await load("PUT", endpoint, body);
export const getData = async (endpoint) => await load("GET", endpoint);
export const deleteData = async (endpoint) => await load("DELETE", endpoint);
