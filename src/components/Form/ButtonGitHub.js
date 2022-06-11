import MuiButton from '@material-ui/core/Button';
import styled from 'styled-components';

export default function Button({ variant = 'contained', children, ...props }) {
  return (
    <StyledMuiButton variant={variant} {...props}>
      {children}
    </StyledMuiButton>
  );
}

const StyledMuiButton = styled(MuiButton)`
  margin-top: 8px !important;
  color: #FFFFFF !important;
  background: #424445 !important;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12) !important;
  p{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    font-size: 18px;
    padding-bottom: 3px;
  }
`;
