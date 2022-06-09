import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import Content from './Content';

export default function Hotel() {
  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      <Content />
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
  text-align: left;
`;
