import { Stack } from '@mui/material';
import { useContext } from 'react';
import styled from 'styled-components';
import ReactCreditCards from '../../../components/CreditCard/index';
import SectionTitle from '../../../components/StyledSectionTitle';
import TicketContext from '../../../contexts/TicketContext';
import * as api from '../../../services/ticketApi';
import MuiButton from '@material-ui/core/Button';
import useToken from '../../../hooks/useToken';
import UserContext from '../../../contexts/UserContext';

export default function ResumeOrder() {
  const { ticket, setTicket } = useContext(TicketContext);
  const token = useToken();
  const { userData } = useContext(UserContext);

  function handleBookingTickets(e) {
    e.preventDefault();
    const formData = {
      type: ticket.type,
      hotel: ticket.hotel,
      totalValue: ticket.value,
      userId: userData.user.id,
    };
    const promise = api.postBooking(token, formData);
    promise
      .then((e) => {
        setTicket((ticket) => ({ ...ticket, payment: true }));
      })
      .catch((error) => {
        alert(error.message);
      });
  }
  return (
    <Stack>
      <SectionTitle>Ingresso escolhido</SectionTitle>
      <ResumeTicket>
        <TicketDetails>
          <p>{ticket.type === 'online' ? 'Online' : 'Presencial'}</p>
          <TicketValue>R$ {ticket.value}</TicketValue>
        </TicketDetails>
      </ResumeTicket>
      <SectionTitle>Pagamento</SectionTitle>
      <ReactCreditCards />
      <StyledMuiButton className="btn btn-primary btn-block" onClick={handleBookingTickets}>
        FINALIZAR PAGAMENTO
      </StyledMuiButton>
    </Stack>
  );
}

const ResumeTicket = styled.div`
  margin-top: 17px;
  width: 290px;
  height: 108px;
  border-radius: 20px;
  background-color: #ffeed2;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledMuiButton = styled(MuiButton)`
  margin-top: 18px !important;
  width: 200px;
`;

const TicketDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  color: #454545;
  font-size: 16px;
  font-weight: 400;
`;

const TicketValue = styled.p`
  margin-top: 8px;
  color: #898989;
  font-size: 14px;
  font-weight: 400;
`;
