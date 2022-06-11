import { useContext } from 'react';
import styled from 'styled-components';
import TicketContext from '../../../contexts/TicketContext';
import ChooseBed from './ChooseBed';

export default function Content() {
  const { ticket } = useContext(TicketContext);

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

  if (ticket.hotelId) {
    return (
      <>
        <StyledSectionTitle>Ótima pedida! Agora escolha seu quarto:</StyledSectionTitle>
        <ChooseBed />
      </>
    );
  }

  return 'Hotel: Em breve!';
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

const StyledSectionTitle = styled.span(() => ({
  color: '#8E8E8E',
  marginTop: '52px',
  fontSize: '20px',
  lineHeight: '23px',
}));
