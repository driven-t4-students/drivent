import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import TicketContext from '../../../contexts/TicketContext';

export default function HotelDescription({ hotel, handleChange }) {
  const { id, imageUrl, name, Room } = hotel;
  const { ticket } = useContext(TicketContext);
  const [numberBeds, setNumberBeds] = useState(0);
  const [acommodation, setAcommodation] = useState('');
  const [bedsOccuped, setBedsOccuped] = useState(0);

  async function SumNumberBeds(Room) {
    const number = await Room.reduce((total, item) => item.type + total, 0);
    setNumberBeds(number);
  }

  async function verifyAcommodation(Room) {
    const typeAcommodation = [];
    await Room.map((el) => {
      if (el.type === 1) {
        if (!typeAcommodation.find((el) => el === 'Single')) {
          return typeAcommodation.push('Single');
        }
      }
      if (el.type === 2) {
        if (!typeAcommodation.find((el) => el === 'Double')) {
          return typeAcommodation.push('Double');
        }
      }
      if (el.type === 3) {
        if (!typeAcommodation.find((el) => el === 'Triple')) {
          return typeAcommodation.push('Triple');
        }
      }
    });
    setAcommodation(typeAcommodation);
  }

  async function verifyBedsOccuped(Room) {
    let counter = 0;
    await Room.map(async (room) => {
      await room.Bed.map((el) => {
        if (el.Ticket) {
          counter += 1;
        }
      });
    });
    setBedsOccuped(counter);
  }

  useEffect(async () => {
    await verifyAcommodation(Room);
    await SumNumberBeds(Room);
    await verifyBedsOccuped(Room);
  }, []);

  return (
    <Hotel onClick={() => handleChange(id)} active={ticket.hotelId === id ? true : false}>
      <img src={imageUrl} alt={name} />
      <HotelName>{name}</HotelName>
      <Description>Tipos de acomodação:</Description>
      <SubDescription>{acommodation[0] + ', ' + acommodation[1] + ' e ' + acommodation[2]}</SubDescription>
      <Description>Vagas Disponíveis:</Description>
      <SubDescription>{numberBeds - bedsOccuped}</SubDescription>
    </Hotel>
  );
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

  ${(props) => (props.active ? 'background-color:#FFEED2;' : '')};

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
