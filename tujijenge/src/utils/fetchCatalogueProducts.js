import { authenticatedFetch } from './api';
export const fetchProducts = async () => {
  try {
    const response = await authenticatedFetch(`${process.env.REACT_APP_BASE_URL}products`);
    if (!response.ok) throw new Error(`Something went wrong: ${response.status}`);
    return await response.json();
  } catch (error) {
    throw new Error(error.message ?? "An error occurred");
  }
};