import api from './api';

export async function getTicket(token) {
  const response = await api.get('/tickets', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function postBooking(token, formData) {
  const response = await api.post('/tickets', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
//
