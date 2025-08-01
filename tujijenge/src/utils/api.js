export async function loginUser({ email, password, role }) {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}users/login/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_type: "stakeholder",
        stakeholder_email: email,
        password_hash: password,
        role,
      }),
    }
  );
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
    localStorage.setItem('authToken', data.token);
  }
  return data;
}

export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const removeAuthToken = () => {
  localStorage.removeItem('authToken');
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