import styled from 'styled-components';
import Hotels from './Hotels';

export default function Content() {
  return (
    <>
      <Hotels/>
    </>
  );
}

const CenterChildren = styled.div`
  width: 100%;
  height: calc(100% - 65px);
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    width: 388px;
    text-align: center;
    color: #8e8e8e;
  }
`;

