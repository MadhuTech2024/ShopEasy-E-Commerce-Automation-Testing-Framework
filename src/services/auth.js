
import { API_BASE_URL } from './api';

const API_URL = `${API_BASE_URL}/auth`;

async function authRequest(endpoint, body, token) {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method: body ? 'POST' : 'GET',
    headers,
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.message || `Request failed (${response.status})`
    );
  }

  return data;
}

export const registerUserApi = (userData) =>
  authRequest('/register', userData);

export const loginUserApi = (credentials) =>
  authRequest('/login', credentials);

export const fetchUserProfileApi = () =>
  authRequest('/me', null, localStorage.getItem('token'));
