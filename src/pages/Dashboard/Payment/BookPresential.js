import { Stack } from '@mui/material';
import { useContext } from 'react';
import styled from 'styled-components';
import Button from '../../../components/Form/Button';
import SectionTitle from '../../../components/StyledSectionTitle';
import TicketContext from '../../../contexts/TicketContext';
import SelectAcomodationType from './SelectAccommodationType';

export default function BookPresential() {
  const { ticket, setTicket } = useContext(TicketContext);

  const onClick = () => {
    if (ticket.hotel === true) ticket.value = 600;
    else ticket.value = 250;

    setTicket((ticket) => ({ ...ticket, booked: true }));
  };

  return (
    <Stack>
      <SectionTitle>Ótimo! Agora escolha sua modalidade de hospedagem</SectionTitle>
      <SelectAcomodationType />
      {ticket?.hotel === null ? (
        ''
      ) : (
        <>
          <SectionTitle>
            Fechado! O total ficou em <strong>{ticket?.hotel ? 'R$ 600' : 'RS 250'}</strong>. Agora é só confirmar:
          </SectionTitle>
          <SubmitContainer>
            <Button type="submit" onClick={onClick}>
              Reservar ingresso
            </Button>
          </SubmitContainer>
        </>
      )}
    </Stack>
  );
}

const SubmitContainer = styled.div`
  margin-top: 20px !important;
  width: 100% !important;

  > button {
    margin-top: 0 !important;
  }
`;
