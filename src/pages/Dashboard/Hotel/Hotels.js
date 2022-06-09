import { Stack } from '@mui/material';
import styled from 'styled-components';
import SectionTitle from '../../../components/StyledSectionTitle';
import * as api from '../../../services/hotelsApi';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../../contexts/UserContext';
import HotelDescription from './HotelDescription';
import TicketContext from '../../../contexts/TicketContext';

export default function Hotels() {
  const { userData } = useContext(UserContext);
  const [hotels, setHotels] = useState([]);
  const { setTicket } = useContext(TicketContext);

  useEffect(() => {
    const promise = api.getHotels(userData.token);
    promise
      .then(async (e) => {
        setHotels(e.hotels);
      })
      .catch(() => { });
  }, []);

  function handleChange(id) {
    setTicket((ticket) => ({
      ...ticket, hotelId: id
    }));
  }

  return (
    <Stack>
      <SectionTitle>Primeiro, escolha sua modalidade de ingresso</SectionTitle>
      <ContainerHotels>
        {hotels.map((hotel) => (
          <HotelDescription
            hotel={hotel}
            handleChange={handleChange}
          />
        )
        )}
      </ContainerHotels>
    </Stack>
  );
};

const ContainerHotels = styled.div`
  margin-top: 18px;
  display: flex;

  gap: 20px;
`;

