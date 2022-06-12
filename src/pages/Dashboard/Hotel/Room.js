import { useContext } from 'react';
import TicketContext from '../../../contexts/TicketContext';
import styled from 'styled-components';
import Beds from './Beds';

export default function Room({ roomData, selectedBed }) {
  const { ticket } = useContext(TicketContext);
  const { Bed: beds } = roomData;
  const { selectedBedId } = selectedBed;

  const roomSelected = !!beds.find((bed) => bed.id === selectedBedId);

  const bedsUnavailable = beds.reduce((acc, bed) => {
    if (bed.Ticket !== null && bed.Ticket?.id !== ticket.id) return acc + 1;
    else return acc + 0;
  }, 0);

  const isRoomUnavailable = roomData.type === bedsUnavailable;

  return (
    <Container roomSelected={roomSelected} roomUnavailable={isRoomUnavailable}>
      <div className="number">{roomData.number}</div>
      <Beds bedsData={beds} roomUnavailable={isRoomUnavailable} selectedBed={selectedBed} />
    </Container>
  );
}

const Container = styled.div`
  width: 190px;
  height: 45px;
  border: 1px solid #cecece;
  flex-shrink: 0;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  background-color: ${(props) => (props.roomSelected ? '#FFEED2' : 'none')};
  background-color: ${(props) => (props.roomUnavailable ? '#CECECE' : 'none')};

  & .number {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    color: ${(props) => (props.roomUnavailable ? '#9D9D9D' : '#454545')};
  }
`;
