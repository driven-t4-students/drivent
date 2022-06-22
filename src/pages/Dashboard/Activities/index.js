import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { useContext, useEffect } from 'react';
import TicketContext from '../../../contexts/TicketContext';
import Content from './Content';
import useToken from '../../../hooks/useToken';
import * as api from '../../../services/ticketApi';

export default function Activities() {
  const { ticket, setTicket } = useContext(TicketContext);
  const token = useToken();
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
          payment: true,
        }));
      })
      .catch(() => { });
  }, []);

  if (!ticket.payment) {
    return (
      <CenterChildren>
        <div>Você precisa ter confirmado pagamento antes
          de fazer a escolha de atividades</div>
      </CenterChildren>
    );
  }
  if (ticket.type === 'online') {
    return (
      <CenterChildren>
        <div>Sua modalidade de ingresso não necessita escolher
          atividade. Você terá acesso a todas as atividades.</div>
      </CenterChildren>
    );
  }
  return (
    <>
      <StyledTypography variant="h4">Escolha de Atividades</StyledTypography>
      <Content/>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
  text-align: left;
`;
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
