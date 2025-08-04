import { authenticatedFetch, BASE_URL } from './api';

export const fetchCommunity = async () => {
  try {
    const data = await authenticatedFetch(`${BASE_URL}/community`);
    return data;
  } catch (error) {
    console.error('Fetch community error:', error);
    throw error;
  }
};