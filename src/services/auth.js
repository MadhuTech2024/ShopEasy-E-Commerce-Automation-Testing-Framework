
import { API_BASE_URL } from './api';

const API_URL = `${API_BASE_URL}/auth`;

async function authRequest(endpoint, body, token) {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;

  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      method: body ? 'POST' : 'GET',
      headers,
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
  } catch (error) {
    console.error('Authentication request could not reach the API:', {
      endpoint,
      errorName: error instanceof Error ? error.name : 'UnknownError',
    });
    throw new Error(
      'Unable to reach the authentication service. Check your connection and try again.',
      { cause: error },
    );
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const requestError = new Error(
      data.message || `Request failed (${response.status})`
    );
    requestError.status = response.status;
    throw requestError;
  }

  return data;
}

export const registerUserApi = (userData) =>
  authRequest('/register', userData);

export const loginUserApi = (credentials) =>
  authRequest('/login', credentials);

export const fetchUserProfileApi = () =>
  authRequest('/me', null, localStorage.getItem('token'));
