import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Button from '../../../components/Form/Button';
import Loading from '../../../components/Loading';
import TicketContext from '../../../contexts/TicketContext';
import useHotelRooms from '../../../hooks/api/useHotelRooms';
import useSaveBed from '../../../hooks/api/useSaveBed';
import useTicket from '../../../hooks/api/useTicket';
import Room from './Room';

export default function ChooseBed() {
  const { ticket, ticketLoading, setTicket } = useContext(TicketContext);
  const { getTicket, ticketData } = useTicket();
  const { rooms, roomsLoading, getHotelRooms } = useHotelRooms(ticket.hotelId);
  const { saveBed } = useSaveBed();
  const [selectedBedId, setSelectedBedId] = useState(ticket.bedId);
  const selectedBed = { selectedBedId, setSelectedBedId };

  useEffect(async () => {
    try {
      await getTicket();
      setTicket((ticket) => ({ ...ticket, ...ticketData }));
    } catch (error) {
      if (error.response?.status) toast('Desculpe, tente novamente');
    }
  }, []);

  useEffect(() => {
    getHotelRooms(ticket.hotelId);
  }, [ticket.hotelId]);

  async function handleOnClick() {
    try {
      const data = { ...ticket, selectedBedId };
      await saveBed(data);
      setTicket((ticket) => ({ ...ticket, bedId: selectedBedId }));
      toast('Acomodação escolhida com sucesso!');
    } catch (err) {
      console.log(err);
      toast('Falha ao salvar sua acomodação. Tente novamente');
    }
  }

  if (roomsLoading || ticketLoading)
    return (
      <Container>
        <Loading />
      </Container>
    );

  if (rooms === null) return null;

  return (
    <>
      <StyledSectionTitle>Ótima pedida! Agora escolha seu quarto:</StyledSectionTitle>
      <Container>
        <RoomsContainer>
          {rooms.map((room) => (
            <Room roomData={room} key={room.id} selectedBed={selectedBed} />
          ))}
        </RoomsContainer>

        <ButtonWrapper>
          <Button disabled={selectedBedId === null} onClick={handleOnClick}>
            Reservar quarto
          </Button>
        </ButtonWrapper>
      </Container>
    </>
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

const StyledSectionTitle = styled.div(() => ({
  color: '#8E8E8E',
  marginTop: '52px',
  fontSize: '20px',
  lineHeight: '23px',
}));
