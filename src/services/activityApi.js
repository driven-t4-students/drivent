import api from './api';

export async function getAllActivities(token) {
  const response = await api.get('/activity', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function subscribeOnActivity(token, data) {
  const response = await api.put('/activity', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
