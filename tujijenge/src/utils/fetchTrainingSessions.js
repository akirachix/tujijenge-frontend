import { authenticatedFetch, BASE_URL } from './api';

export const fetchTrainingSessions = async () => {
  try {
    const data = await authenticatedFetch(`${BASE_URL}/training_sessions`);
    return data;
  } catch (error) {
    console.error('Fetch training sessions error:', error);
    throw error;
  }
};