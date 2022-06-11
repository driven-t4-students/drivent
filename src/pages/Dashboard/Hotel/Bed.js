import { useContext } from 'react';
import { Available, Selected, Unavailable } from './BedIcons';
import TicketContext from '../../../contexts/TicketContext';
import styled from 'styled-components';

export default function Bed({ bedData, selectedBed }) {
  const { ticket } = useContext(TicketContext);
  const { selectedBedId, setSelectedBedId } = selectedBed;

  const bedUnavailable = bedData.Ticket !== null && bedData.id !== ticket.bedId;

  const isThisBedSelected = selectedBedId === bedData.id;

  function handleOnClick() {
    if (isThisBedSelected) setSelectedBedId(null);
    else setSelectedBedId(bedData.id);
  }

  return (
    <Container onClick={handleOnClick} disabled={bedUnavailable}>
      {isThisBedSelected ? <Selected /> : bedUnavailable ? <Unavailable /> : <Available />}
    </Container>
  );
}

const Container = styled.div`
  ${(props) => props.disabled && 'pointer-events: none'}
`;
