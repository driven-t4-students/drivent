import api from './api';

export async function getTicket(token) {
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.get('/tickets', headers);

  return response.data;
}

export async function postBooking(token, formData) {
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.post('/tickets', formData, headers);
  return response.data;
}
