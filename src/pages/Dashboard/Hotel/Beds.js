import styled from 'styled-components';
import Bed from './Bed.js';
import { FilledRoom } from './BedIcons.js';

export default function Beds({ bedsData, roomUnavailable, selectedBed }) {
  if (roomUnavailable)
    return (
      <Container roomUnavailable={roomUnavailable}>
        {bedsData.map(() => (
          <FilledRoom disabled={true} />
        ))}
      </Container>
    );

  return (
    <Container>
      {bedsData.map((bed) => (
        <Bed key={bed.id} bedData={bed} selectedBed={selectedBed} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10%;

  & svg {
    flex-shrink: 0;
    height: 3vmin;
    width: 3vmin;
    fill: black;
    cursor: ${(props) => (props.roomUnavailable ? 'cursor' : 'pointer')};
    ${(props) => props.roomUnavailable && 'pointer-events: none'};
  }
`;
