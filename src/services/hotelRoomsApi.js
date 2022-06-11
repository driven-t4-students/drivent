import api from './api';

export async function getHotelRooms(token, hotelId) {
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.get(`/hotels/${hotelId}/rooms`, headers);

  return response.data;
}
