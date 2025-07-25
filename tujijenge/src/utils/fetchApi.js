const BASE_URL = process.env.REACT_APP_API_URL;
const TOKEN_STORAGE_KEY = 'authTokenKey';
const AUTH_TOKEN = process.env.REACT_APP_AUTH_TOKEN;

if (!localStorage.getItem(TOKEN_STORAGE_KEY)) {
  localStorage.setItem(TOKEN_STORAGE_KEY, AUTH_TOKEN);
}

export const fetchWithAuth = async (url, token) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || errorData.detail || response.statusText || 'Request failed'
    );
  }
  return response.json();
};

export { BASE_URL, TOKEN_STORAGE_KEY };