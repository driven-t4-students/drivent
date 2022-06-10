import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../../components/Form/Button';
import SectionTitle from '../../../components/StyledSectionTitle';
import TicketContext from '../../../contexts/TicketContext';
import UserContext from '../../../contexts/UserContext';
import * as api from '../../../services/hotelsApi';

export default function SelectedRoom({ hasBed }) {
  const { userData } = useContext(UserContext);
  const { ticket } = useContext(TicketContext);
  const [roomInformation, setRoomIformation] = useState();

  useEffect(() => {
    api.getHotelsByBedId(userData.token, ticket.hotelId).then(async (e) => console.log(e));
  }, []);

  return (
    <>
      <SectionTitle>Você já escolheu seu quarto:</SectionTitle>
      <Hotel>
        <img src="none" alt="none" />
        <HotelName>{'nada'}</HotelName>
        <Description>Tipos de acomodação:</Description>
        <SubDescription>{'nadinha'}</SubDescription>
        <Description>Vagas Disponíveis:</Description>
        <SubDescription>{'numberBeds - bedsOccuped'}</SubDescription>
      </Hotel>
      <SubmitContainer>
        <Button type="submit" onClick={() => console.log(hasBed)}>
          TROCAR DE QUARTO
        </Button>
      </SubmitContainer>
    </>
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
