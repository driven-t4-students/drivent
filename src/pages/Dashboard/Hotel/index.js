import { useContext } from 'react';
import styled from 'styled-components';
import TicketContext from '../../../contexts/TicketContext';

export default function Hotel() {
  const { ticket } = useContext(TicketContext);

  if (!ticket.payment) {
    return (
      <CenterChildren>
        <div>Você precisa ter confirmado pagamento antes
          de fazer a escolha de hospedagem</div>
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
