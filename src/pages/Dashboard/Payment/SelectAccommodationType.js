import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import TicketContext from '../../../contexts/TicketContext';

export default function SelectAcomodationType() {
  const [acomodationType, setAcomodationType] = useState(null);
  const { ticket, setTicket } = useContext(TicketContext);

  useEffect(() => {
    if (ticket) setAcomodationType(ticket.acomodationType);
  }, []);

  const handleOnChange = (_event, newAcomodationType) => {
    setAcomodationType(newAcomodationType);
    setTicket((ticket) => ({ ...ticket, acomodationType: newAcomodationType }));
  };

  return (
    <Stack>
      <ToggleType value={acomodationType} exclusive onChange={handleOnChange} aria-label="text alignment">
        <ToggleButton value="hotel-off" aria-label="hotel-off">
          <span>Sem Hotel</span>
          <span>+R$ 0</span>
        </ToggleButton>

        <ToggleButton value="hotel-on" aria-label="hotel-on">
          <span>Com Hotel</span>
          <span>+R$ 350</span>
        </ToggleButton>
      </ToggleType>
    </Stack>
  );
}

const ToggleType = styled(ToggleButtonGroup)(() => ({
  gap: '24px',
  marginTop: '17px',
  margin: '10px 0 10px 0',
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
