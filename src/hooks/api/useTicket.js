import { useEffect } from 'react';
import { toast } from 'react-toastify';
import useAsync from '../useAsync';
import useToken from '../useToken';
import * as ticketApi from '../../services/ticketApi';

export default function useTicket() {
  const token = useToken();

  const {
    data: ticketData,
    loading: ticketLoading,
    act: getTicket,
  } = useAsync(() => ticketApi.getTicket(token), false);

  useEffect(async () => {
    try {
      await getTicket(token);
    } catch (error) {
      if (error.response?.status !== 404 && error.response?.status !== 401)
        toast('Não foi possível carregar seu ingresso');
    }
  }, []);

  return {
    ticketData,
    ticketLoading,
    getTicket,
  };
}
