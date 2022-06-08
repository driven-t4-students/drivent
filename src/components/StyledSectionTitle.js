import styled from 'styled-components';

export default function SectionTitle({ children }) {
  return <Style>{children}</Style>;
}

const Style = styled.span(() => ({
  color: '#8E8E8E',
  marginTop: '20px',
  fontSize: '20px',
  lineHeight: '23px',
}));
