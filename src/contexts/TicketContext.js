/* 

First, verify if ticket is already payed, sending a get request to api
If ticket is already payed, populate accordingly the ticket context
If not, verify if localStorage has a ticket item. 
If yes, json.parse the item and populate context
If not, create an empty ticket and populate context

*/

import { createContext } from 'react';
import useTicket from '../hooks/api/useTicket';
import useLocalStorage from '../hooks/useLocalStorage';

const TicketContext = createContext();
export default TicketContext;

export function TicketProvider({ children }) {
  const { ticketData, ticketLoading } = useTicket();

  const [ticket, setTicket] = useLocalStorage('ticket', null);

  if (ticketData) setTicket({ ...ticketData, booked: true, payment: true });

  return <TicketContext.Provider value={{ ticket, setTicket, ticketLoading }}>{children}</TicketContext.Provider>;
}
