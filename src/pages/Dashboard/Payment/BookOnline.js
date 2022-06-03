import { Stack } from '@mui/material';
import { useContext } from 'react';
import styled from 'styled-components';
import Button from '../../../components/Form/Button';
import SectionTitle from '../../../components/StyledSectionTitle';
import TicketContext from '../../../contexts/TicketContext';

export default function BookOnline(handlePayment) {
  const { setTicket } = useContext(TicketContext);

  const onClick = () => {
    setTicket((ticket) => ({ ...ticket, booked: true, checkPayment: true, value: 100 }));
  };

  return (
    <Stack>
      <SectionTitle>
        Fechado! O total ficou em <strong>R$ 100</strong>. Agora é só confirmar:
      </SectionTitle>
      <SubmitContainer>
        <Button type="submit" onClick={onClick}>
          Reservar ingresso
        </Button>
      </SubmitContainer>
    </Stack>
  );
}

const SubmitContainer = styled.div`
  margin-top: 40px !important;
  width: 100% !important;

  > button {
    margin-top: 0 !important;
  }
`;
