import { Typography } from '@material-ui/core';
import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import TicketContext from '../../../contexts/TicketContext';
import Content from './Content';
import * as api from '../../../services/ticketApi';
import useToken from '../../../hooks/useToken';

export default function Hotel() {
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
      .catch(() => {});
  }, []);

  if (!ticket.payment) {
    return (
      <CenterChildren>
        <div>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</div>
      </CenterChildren>
    );
  }
  if (!ticket.hotel) {
    return (
      <CenterChildren>
        <div>Sua modalidade de ingresso não inclui hospedagem Prossiga para a escolha de atividades</div>
      </CenterChildren>
    );
  }
  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      <Content />
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
