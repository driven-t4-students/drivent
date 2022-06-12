import { Stack } from '@mui/material';
import styled from 'styled-components';
import SectionTitle from '../../../components/StyledSectionTitle';
import * as api from '../../../services/hotelsApi';
import * as ticketApi from '../../../services/ticketApi';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../../contexts/UserContext';
import HotelDescription from './HotelDescription';
import TicketContext from '../../../contexts/TicketContext';
import SelectedRoom from './selectedRoom';

export default function Hotels() {
  const { userData } = useContext(UserContext);
  const [hotels, setHotels] = useState([]);
  const { setTicket } = useContext(TicketContext);
  const [hasBed, handleBed] = useState();

  useEffect(() => {
    ticketApi.getTicket(userData.token).then(async (e) => handleBed(e.bedId));

    const promise = api.getHotels(userData.token);
    promise
      .then(async (e) => {
        setHotels(e.hotels);
      })
      .catch(() => {});
  }, []);

  function handleChange(id) {
    setTicket((ticket) => ({
      ...ticket,
      hotelId: id,
    }));
  }

  return (
    <Stack>
      {!hasBed ? (
        <>
          <SectionTitle>Primeiro, escolha seu hotel</SectionTitle>
          <ContainerHotels>
            {hotels.map((hotel, i) => (
              <HotelDescription hotel={hotel} handleChange={handleChange} key={i} />
            ))}
          </ContainerHotels>
        </>
      ) : (
        <SelectedRoom hasBed={hasBed} />
      )}
    </Stack>
  );
}

const ContainerHotels = styled.div`
  margin-top: 18px;
  display: flex;

  gap: 20px;
`;
