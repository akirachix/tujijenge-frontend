import { authenticatedFetch, BASE_URL } from './api';

export const fetchUsers = async () => {
  try {
    const data = await authenticatedFetch(`${BASE_URL}/users`);
    return data.map(u => ({
      id: u.id,
      first_name: u.first_name,
      last_name: u.last_name,
      address: u.address || 'No location'
    }));
  } catch (error) {
    console.error('Fetch users error:', error);
    throw error;
  }
};