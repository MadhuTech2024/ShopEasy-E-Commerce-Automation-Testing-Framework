const API_URL = 'http://localhost:5001/api';

export const createOrderApi = async (orderData) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Please log in before placing your order.');
  }

  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(
      data.message || 'Unable to place your order.'
    );
    error.status = response.status;
    throw error;
  }

  return data;
};