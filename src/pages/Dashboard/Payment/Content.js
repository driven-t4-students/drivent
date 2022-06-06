import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import TicketContext from '../../../contexts/TicketContext';
import UserContext from '../../../contexts/UserContext';
import useEnrollment from '../../../hooks/api/useEnrollment';
import Loading from '../../../components/Loading';
import SelectTicketType from './SelectTicketType';
import BookOnline from './BookOnline';
import ResumeOrder from './ResumeOrder';
import PaymentDone from './PaymentDone';
import * as api from '../../../services/ticketApi';
import BookPresential from './BookPresential';

export default function Content() {
  const { userData } = useContext(UserContext);
  const { enrollment, enrollmentLoading } = useEnrollment();
  const { ticket, ticketLoading, setTicket } = useContext(TicketContext);

  useEffect(() => {
    const promise = api.getTicket(userData.token);
    promise
      .then((e) => {
        setTicket(() => ({
          type: e.type,
          booked: true,
          checkPayment: true,
          value: e.totalValue,
          hotel: e.hotel,
          payment: true,
        }));
      })
      .catch(() => {});
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
