import { createContext, useEffect } from 'react';
import useTicket from '../hooks/api/useTicket';
import useLocalStorage from '../hooks/useLocalStorage';

const TicketContext = createContext();
export default TicketContext;

export function TicketProvider({ children }) {
  const { ticketData, ticketLoading } = useTicket();
  const [ticket, setTicket] = useLocalStorage('ticket', { booked: false });

  useEffect(() => {
    if (ticketData) setTicket({ ...ticketData, booked: true, payment: true, hotelId: false });
  }, [ticketData]);

  return <TicketContext.Provider value={{ ticket, setTicket, ticketLoading }}>{children}</TicketContext.Provider>;
}
