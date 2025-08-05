import { fetchWithAuth } from './api';

export const fetchUsers = async () => {
  try {
    const response = await fetchWithAuth(`${process.env.REACT_APP_BASE_URL}users`); 
    return response;
  } catch (error) {
    throw error;
  }
};