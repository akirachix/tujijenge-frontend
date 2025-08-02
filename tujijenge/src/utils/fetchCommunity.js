import { authenticatedFetch, getAuthToken } from "./api";
const BASE_URL = process.env.REACT_APP_BASE_URL;  
export const fetchCommunity = async () => {
  const token = getAuthToken();

  if (!token) {
    throw new Error("No auth token found");
  }
  const response = await authenticatedFetch(`${BASE_URL}community/`);
  if (!response.ok) {
    throw new Error(`Failed to fetch community data: ${response.status}`);
  }
  const result = await response.json();
  return result;
};
