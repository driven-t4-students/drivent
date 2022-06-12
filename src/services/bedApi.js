import api from './api';

export async function createBedBooking(token, data) {
  const { selectedBedId: bedId, id: ticketId } = data;
  const body = { ticketId };

  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.post(`/beds/${bedId}`, body, headers);
  return response.data;
}
//
