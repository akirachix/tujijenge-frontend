import {  getAuthToken } from './api';

const BASE_URL = process.env.REACT_APP_BASE_URL;
export const fetchTrainingSessions = async () => {
    
    const token = getAuthToken();



    if (!token) {
        throw new Error("No token found in local storage");
    }

    try {
        const response = await fetch(`${BASE_URL}/training_sessions/`, {
            headers: {
                'Authorization': `Token ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Something went wrong: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error.message ?? "An error occurred");
    }
};

