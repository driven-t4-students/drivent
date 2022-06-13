import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Button from '../../../components/Form/Button';
import SectionTitle from '../../../components/StyledSectionTitle';
import TicketContext from '../../../contexts/TicketContext';
import UserContext from '../../../contexts/UserContext';
import * as api from '../../../services/hotelsApi';

export default function SelectedRoom() {
  const { ticket, setTicket } = useContext(TicketContext);
  const { userData } = useContext(UserContext);
  const [roomInformation, setRoomInformation] = useState();
  const [bedsOccupied, setBedsOccupied] = useState();

  let cont = -1;
  let hotel = { name: '', image: '', number: 0, type: 0 };
  let hotelType = '';
  let beds = 'Somente você';

  useEffect(() => {
    const promise = api.getHotelsByBedId(userData.token, ticket.bedId);
    promise.then((hotelInfo) => {
      setRoomInformation(hotelInfo);

      api.getBedsByRoomId(userData.token, hotelInfo.hotels.roomId).then((res) => {
        setBedsOccupied(res);
      });
    });
  }, []);

  async function resetBed() {
    try {
      setTicket({ ...ticket, lastBedId: ticket.bedId, bedId: null });
      toast('Solicitação feita com sucesso!');
    } catch (err) {
      console.log(err);
      toast('Falha ao solicitar sua troca de quarto. Tente novamente!');
    }
  }

  if (roomInformation && bedsOccupied) {
    for (let i = 0; i < bedsOccupied.Bed.length; i++) {
      const element = bedsOccupied.Bed[i];
      if (element.Ticket) {
        cont += 1;
      }
    }

    hotel = {
      name: roomInformation.hotels.room.Hotel.name,
      image: roomInformation.hotels.room.Hotel.imageUrl,
      number: roomInformation.hotels.room.number,
      type: roomInformation.hotels.room.type,
    };

    if (hotel.type === 1) {
      hotelType = 'Single';
    } else if (hotel.type === 2) {
      hotelType = 'Double';
    } else if (hotel.type === 3) {
      hotelType = 'Triple';
    }

    if (cont === 1) {
      beds = `Você e mais ${cont} pessoa`;
    } else if (cont === 2) {
      beds = `Você e mais ${cont} pessoas`;
    }

    return (
      <>
        <SectionTitle>Você já escolheu seu quarto:</SectionTitle>
        <Hotel>
          <img src={hotel.image} alt={hotel.name} />
          <HotelName>{hotel.name}</HotelName>
          <Description>Quarto reservado</Description>
          <SubDescription>
            {hotel.number} ({hotelType})
          </SubDescription>
          <Description>Pessoas no seu quarto</Description>
          <SubDescription>{beds}</SubDescription>
        </Hotel>
        <SubmitContainer>
          <Button type="submit" onClick={() => resetBed()}>
            TROCAR DE QUARTO
          </Button>
        </SubmitContainer>
      </>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}

const Hotel = styled.div`
  width: 196px;
  height: 264px;

  background: #f1f1f1;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 16px;
  margin-top: 16px;

  background-color: #ffeed2;

  img {
    width: 168px;
    height: 109px;
    border-radius: 5px;
  }
`;

const HotelName = styled.div`
  width: 100%;
  color: #343434;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;

  margin-top: 10px;
  margin-bottom: 10px;
`;

const Description = styled.div`
  width: 100%;
  height: 14px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;

  color: #3c3c3c;
`;

const SubDescription = styled.div`
  width: 100%;
  height: 14px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  color: #3c3c3c;
  margin-bottom: 15px;
`;

const SubmitContainer = styled.div`
  margin-top: 20px !important;
  width: 100% !important;

  > button {
    margin-top: 0 !important;
  }
`;
