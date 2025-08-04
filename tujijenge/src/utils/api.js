export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const TOKEN_STORAGE_KEY = 'authToken';

export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
};

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
};

export const removeAuthToken = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};

export const loginUser = async ({ email, password, role }) => {
  const response = await fetch(`${BASE_URL}/users/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_type: 'stakeholder',
      stakeholder_email: email,
      password_hash: password,
      role,
    }),
  });

  if (!response.ok) {
    let msg = 'Login failed';
    try {
      const data = await response.json();
      if (data.error) msg = data.error;
    } catch {}
    throw new Error(msg);
  }

  const data = await response.json();
  if (data.token) {
    setAuthToken(data.token);
  }
  return data;
};

export const authenticatedFetch = async (url, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Token ${token}`;
  }

  const config = { ...options, headers };
  const response = await fetch(url, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || errorData.detail || response.statusText || 'Request failed'
    );
  }

  return response.json();
};