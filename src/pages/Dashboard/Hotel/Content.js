import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import TicketContext from '../../../contexts/TicketContext';
import ChooseBed from './ChooseBed';
import Hotels from './Hotels';
import * as api from '../../../services/ticketApi';
import useToken from '../../../hooks/useToken';
import SelectedRoom from './selectedRoom';

export default function Content() {
  const token = useToken();
  const { ticket, setTicket } = useContext(TicketContext);

  useEffect(() => {
    const promise = api.getTicket(token);
    promise
      .then((response) => {
        setTicket((ticket) => ({
          ...ticket,
          ...response,
          type: response.type,
          booked: true,
          checkPayment: true,
          totalValue: response.totalValue,
          hotel: response.hotel,
          payment: true,
        }));
      })
      .catch(() => { });
  }, [ticket.bedId]);

  if (!ticket.payment) {
    return (
      <CenterChildren>
        <div>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</div>
      </CenterChildren>
    );
  }

  if (ticket.bedId) {
    return (
      <SelectedRoom />
    );
  }

  if (ticket.hotel)
    return (
      <>
        <Hotels />
        {ticket.hotelId && <ChooseBed />}
      </>
    );

  return (
    <CenterChildren>
      <div>Sua modalidade de ingresso não inclui hospedagem Prossiga para a escolha de atividades</div>
    </CenterChildren>
  );
}

const CenterChildren = styled.div`
  width: 100%;
  height: calc(100% - 65px);
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    width: 388px;
    text-align: center;
    color: #8e8e8e;
  }
`;
