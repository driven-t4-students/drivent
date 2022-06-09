import { useContext } from 'react';
import styled from 'styled-components';
import TicketContext from '../../../contexts/TicketContext';

export default function HotelDescription({ hotel, handleChange }) {
  const { id, imageUrl, name } = hotel;
  const { ticket } = useContext(TicketContext);
  
  return (
    <Hotel onClick={() => handleChange(id)} active={ ticket.hotelId === id ? true : false }>
      <img src={imageUrl} />
      <HotelName>{name}</HotelName>
      <Description>Tipos de acomodação:</Description>
      <SubDescription></SubDescription>
      <Description>Vagas Disponíveis:</Description>
      <SubDescription></SubDescription>
    </Hotel>
  );
}

const Hotel = styled.div`
  width: 196px;
  height: 264px;
  
  background: #F1F1F1;
  border-radius: 10px;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  
  padding: 16px;
  
  ${(props) => (props.active ? 'background-color:#FFEED2;' : '')};

  img{
    width: 168px;
    height: 109px;
    border-radius:5px ;
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

  color: #3C3C3C;


`;

const SubDescription = styled.div`
  width: 100%;
  height: 14px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  color: #3C3C3C;
  margin-bottom: 15px;

`;

