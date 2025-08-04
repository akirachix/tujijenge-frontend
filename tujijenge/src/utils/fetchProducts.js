import { authenticatedFetch } from './api';

export const fetchProducts = async () => {
  try {
    const response = await authenticatedFetch(`${process.env.REACT_APP_BASE_URL}products/`);
    if (!response.ok) throw new Error(`Something went wrong: ${response.status}`);
    const data = await response.json();
    return data.map(p => ({
      id: p.product_id,
      name: p.product_name
    }));
  } catch (error) {
    console.error('Fetch products error:', error);
    throw error;
  }
};