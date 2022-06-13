import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import TicketContext from '../../../contexts/TicketContext';
import useEnrollment from '../../../hooks/api/useEnrollment';
import Loading from '../../../components/Loading';
import SelectTicketType from './SelectTicketType';
import BookOnline from './BookOnline';
import ResumeOrder from './ResumeOrder';
import PaymentDone from './PaymentDone';
import BookPresential from './BookPresential';
import * as api from '../../../services/ticketApi';
import useToken from '../../../hooks/useToken';

export default function Content() {
  const { enrollment, enrollmentLoading } = useEnrollment();
  const { ticket, ticketLoading, setTicket } = useContext(TicketContext);
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
      {ticket?.booked === false ? (
        <>
          <SelectTicketType />
          {ticket?.type === 'online' ? <BookOnline /> : null}
          {ticket?.type === 'presential' ? <BookPresential /> : null}
        </>
      ) : ticket?.payment === true ? (
        <>
          <PaymentDone />
        </>
      ) : (
        <ResumeOrder />
      )}
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
