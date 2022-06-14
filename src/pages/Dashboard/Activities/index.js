import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { useContext } from 'react';
import TicketContext from '../../../contexts/TicketContext';

export default function Activities() {
  const { ticket } = useContext(TicketContext);

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
    <StyledTypography variant="h4">Escolha de Atividades</StyledTypography>
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
