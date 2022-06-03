import { useContext } from 'react';
import styled from 'styled-components';
import TicketContext from '../../../contexts/TicketContext';
import useEnrollment from '../../../hooks/api/useEnrollment';
import Loading from '../../../components/Loading';
import SelectTicketType from './SelectTicketType';
import BookOnline from './BookOnline';
import ResumeOrder from './ResumeOrder';
import PaymentDone from './PaymentDone';

export default function Content() {
  const { enrollment, enrollmentLoading } = useEnrollment();
  const { ticket, ticketLoading } = useContext(TicketContext);

  if (enrollmentLoading || ticketLoading) {
    return (
      <CenterChildren>
        <Loading />
      </CenterChildren>
    );
  }

  if (!enrollment) {
    return (
      <CenterChildren>
        <div>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</div>
      </CenterChildren>
    );
  }

  return (
    <>
      {ticket?.booked === false ?
        <>
          <SelectTicketType />
          {ticket?.type === 'online' ? <BookOnline /> : null}
        </>
        : ticket?.payment === true ?
          <>
            <h1>Resumo da compra!</h1>
            <PaymentDone />
          </>
          :
          <ResumeOrder/>
      }
    </>
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
