import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  border: 1px solid ${(props) => props.theme.blueLight};
  color: ${(props) => props.theme.blueLight};
  width: fit-content;
  height: fit-content;
  min-height: 40px;
  background-color: ${(props) => props.theme.greyDark};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0.4rem 0.5rem;
  user-select: none;
  border-radius: 2px;

  &:active {
    background-color: ${(props) => props.theme.greyMediumDark};
    transition: background-color 0.2s;
  }
`;

const Button = ({ children, title, onClick }) => {
  return (
    <StyledButton onClick={onClick}>
      {children}
      {title}
    </StyledButton>
  );
};

export default Button;
