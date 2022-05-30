import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import TicketContext from '../../../contexts/TicketContext';
import SectionTitle from '../../../components/StyledSectionTitle';

export default function SelectTicketType() {
  const [ticketType, setTicketType] = useState(null);
  const { ticket, setTicket } = useContext(TicketContext);

  useEffect(() => {
    if (ticket) setTicketType(ticket.type);
  }, []);

  const handleOnChange = (_event, newTicketType) => {
    setTicketType(newTicketType);
    setTicket((ticket) => ({ ...ticket, type: newTicketType }));
  };

  return (
    <Stack>
      <SectionTitle>Primeiro, escolha sua modalidade de ingresso</SectionTitle>
      <ToggleType value={ticketType} exclusive onChange={handleOnChange} aria-label="text alignment">
        <ToggleButton value="presencial" aria-label="presencial">
          <span>Presencial</span>
          <span>R$ 250</span>
        </ToggleButton>

        <ToggleButton value="online" aria-label="online">
          <span>Online</span>
          <span>R$ 100</span>
        </ToggleButton>
      </ToggleType>
    </Stack>
  );
}

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
