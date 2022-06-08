import { Stack } from '@mui/material';
import styled from 'styled-components';
import SectionTitle from '../../../components/StyledSectionTitle';
import Image1 from '../../../assets/images/Rectangle 8.png';

export default function Hotels() {
  return (
    <Stack>
      <SectionTitle>Primeiro, escolha sua modalidade de ingresso</SectionTitle>
      <ContainerHotels>
        <Hotel>
          <img src={Image1} />
          <HotelName>Driven Resort</HotelName>
          <Description>Tipos de acomodação:</Description>
          <SubDescription>Single e Double</SubDescription>
          <Description>Vagas Disponíveis:</Description>
          <SubDescription>25</SubDescription>
        </Hotel>
        <Hotel>
          <img src={Image1} />
          <HotelName>Driven Resort</HotelName>
          <Description>Tipos de acomodação:</Description>
          <SubDescription>Single e Double</SubDescription>
          <Description>Vagas Disponíveis:</Description>
          <SubDescription>25</SubDescription>
        </Hotel>
        <Hotel>
          <img src={Image1} />
          <HotelName>Driven Resort</HotelName>
          <Description>Tipos de acomodação:</Description>
          <SubDescription>Single e Double</SubDescription>
          <Description>Vagas Disponíveis:</Description>
          <SubDescription>25</SubDescription>
        </Hotel>
      </ContainerHotels>
    </Stack>
  );
};

const ContainerHotels = styled.div`
  margin-top: 18px;
  display: flex;

  gap: 20px;
`;

const Hotel = styled.div`
  width: 196px;
  height: 264px;

  background: #F1F1F1;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 16px;


  img{
    width: 168px;
    height: 109px;
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

