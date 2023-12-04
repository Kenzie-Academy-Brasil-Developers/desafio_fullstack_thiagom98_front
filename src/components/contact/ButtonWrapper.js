import styled from 'styled-components';

export const ButtonWrapper = styled.div`
  width: ${props => props.width || "auto"};
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: .6vh;
  margin-bottom: 5vh;
  column-gap: 10px;

`;
