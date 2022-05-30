import { useContext } from 'react';
import styled from 'styled-components';
import TicketContext from '../../../contexts/TicketContext';
import useEnrollment from '../../../hooks/api/useEnrollment';
import Loading from '../../../components/Loading';

export default function Content() {
  const { enrollment, enrollmentLoading } = useEnrollment();
  const { ticket, setTicket, ticketLoading } = useContext(TicketContext);

  if (enrollmentLoading || ticketLoading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  if (!enrollment) {
    return (
      <Container>
        <div>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</div>
      </Container>
    );
  }

  return null;
}

const Container = styled.div`
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
