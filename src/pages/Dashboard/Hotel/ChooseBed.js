/* eslint-disable no-console */
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Button from '../../../components/Form/Button';
import Loading from '../../../components/Loading';
import TicketContext from '../../../contexts/TicketContext';
import useHotelRooms from '../../../hooks/api/useHotelRooms';
import useSaveBed from '../../../hooks/api/useSaveBed';
import Room from './Room';

export default function ChooseBed() {
  const { ticket } = useContext(TicketContext);
  const { rooms, roomsLoading } = useHotelRooms(ticket.hotelId);
  const { saveBed } = useSaveBed();
  const [selectedBedId, setSelectedBedId] = useState(ticket.bedId);

  const selectedBed = { selectedBedId, setSelectedBedId };

  async function handleOnClick() {
    try {
      const data = { ...ticket, selectedBedId };
      await saveBed(data);

      toast('Acomodação escolhida com sucesso!');
    } catch (err) {
      console.log(err);
      toast('Falha ao salvar sua acomodação. Tente novamente');
    }
  }

  if (roomsLoading)
    return (
      <Container>
        <Loading />
      </Container>
    );

  if (rooms === null) return null;

  return (
    <Container>
      <RoomsContainer>
        {rooms.map((room) => (
          <Room roomData={room} key={room.id} selectedBed={selectedBed} />
        ))}
      </RoomsContainer>

      <ButtonWrapper>
        <Button disabled={selectedBedId === null} onClick={handleOnClick}>
          {' '}
          Reservar quarto
        </Button>
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 33px;
`;

const RoomsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  gap: 8px 17px;
`;

const ButtonWrapper = styled.div`
  width: 30%;
  margin-top: 3vmin;
`;
