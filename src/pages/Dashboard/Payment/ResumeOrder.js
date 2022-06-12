import { Stack } from '@mui/material';
import { useContext } from 'react';
import styled from 'styled-components';
import ReactCreditCards from '../../../components/CreditCard/index';
import SectionTitle from '../../../components/StyledSectionTitle';
import TicketContext from '../../../contexts/TicketContext';

export default function ResumeOrder() {
  const { ticket } = useContext(TicketContext);

  return (
    <Stack>
      <SectionTitle>Ingresso escolhido</SectionTitle>
      <ResumeTicket>
        <TicketDetails>
          <p>
            {ticket.type === 'online'
              ? 'Online'
              : `Presencial ${ticket.hotel === true ? ' + Com Hotel' : ' + Sem Hotel'}`}
          </p>
          <TicketValue>R$ {ticket.totalValue}</TicketValue>
        </TicketDetails>
      </ResumeTicket>
      <SectionTitle>Pagamento</SectionTitle>
      <ReactCreditCards />
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
