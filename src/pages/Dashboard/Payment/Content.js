import { useContext } from 'react';
import styled from 'styled-components';
import TicketContext from '../../../contexts/TicketContext';
import useEnrollment from '../../../hooks/api/useEnrollment';
import Loading from '../../../components/Loading';
import { ToggleButtonGroup } from '@mui/material';
import SelectTicketType from './SelectTicketType';
import BookOnline from './BookOnline';
import PaymentDone from './PaymentDone';

export default function Content() {
  const { enrollment, enrollmentLoading } = useEnrollment();
  const { ticket, ticketLoading, setTicket } = useContext(TicketContext);

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
          <button onClick={() => setTicket((ticket) => ({ ...ticket, payment: true }))}>Finalizar Pagamento</button>
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

const ToggleType = styled(ToggleButtonGroup)(() => ({
  gap: '24px',
  marginTop: '17px',
  margin: '17px 0 44px 0',
  '& .MuiToggleButtonGroup-grouped': {
    borderRadius: '20px !important',
    border: '1px solid #CECECE !important',
    width: '145px !important',
    height: '145px !important',
    backgroundColor: 'white !important',
    textTransform: 'capitalize !important',
    fontSize: '16px',
    display: 'flex',
    flexDirection: 'column',

    '& > span:first-of-type': {
      color: '#454545 !important',
    },
    '& > span:last-of-type': {
      color: '#898989 !important',
    },

    '&.Mui-selected': {
      backgroundColor: '#FFEED2 !important',
      color: '#898989 !important',
    },
  },
}));

const TicketTypeTitle = styled.span(() => ({
  color: '#8E8E8E',
  marginTop: '37px',
  fontSize: '20px',
  lineHeight: '23px',
}));
