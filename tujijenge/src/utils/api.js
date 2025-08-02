export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const TOKEN_STORAGE_KEY = 'authToken';
export async function loginUser({ email, password, role }) {
  const response = await fetch(`${BASE_URL}users/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_type: "stakeholder",
      stakeholder_email: email,
      password_hash: password,
      role,
    }),
  });
  if (!response.ok) {
    let msg = "Login failed";
    try {
      const data = await response.json();
      if (data.error) msg = data.error;
    } catch {}
    throw new Error(msg);
  }
  const data = await response.json();
  if (data.token) {
    localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
  }
  return data;
}
export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
};
export const removeAuthToken = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};
export async function authenticatedFetch(url, options = {}) {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  if (token) {
    headers['Authorization'] = `Token ${token}`;
  }
  const config = { ...options, headers };
  return fetch(url, config);
}
export const fetchWithAuth = async (url, token = null) => {
  const authToken = token || getAuthToken();
  if (!authToken) throw new Error('No auth token found');
  const response = await fetch(url, {
    headers: {
      Authorization: `Token ${authToken}`,
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