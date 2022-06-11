import useAsync from '../useAsync';
import useToken from '../useToken';
import * as hotelRoomsApi from '../../services/hotelRoomsApi';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function useHotelRooms(hotelId) {
  const token = useToken();
  const {
    data: rooms,
    loading: roomsLoading,
    act: getHotelRooms,
  } = useAsync(() => hotelRoomsApi.getHotelRooms(token, hotelId), false);

  useEffect(async () => {
    try {
      await getHotelRooms();
    } catch (error) {
      if (error.response?.status) toast('Desculpe, tente novamente');
    }
  }, []);

  return {
    rooms,
    roomsLoading,
  };
}
