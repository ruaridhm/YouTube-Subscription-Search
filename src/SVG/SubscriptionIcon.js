import React from 'react';
import styled from 'styled-components';

const StyledSvg = styled.svg`
  pointer-events: none;
  display: block;
  width: 100%;
  height: 100%;
  max-width: 24px;
  max-height: 24px;
  margin-right: 0.5rem;
`;

const StyledPath = styled.path`
  fill: ${(props) => props.theme.blueLight};
`;

const SubscriptionIcon = () => {
  return (
    <StyledSvg
      viewBox='0 0 24 24'
      preserveAspectRatio='xMidYMid meet'
      focusable='false'
    >
      <g>
        <StyledPath d='M18.7 8.7H5.3V7h13.4v1.7zm-1.7-5H7v1.6h10V3.7zm3.3 8.3v6.7c0 1-.7 1.6-1.6 1.6H5.3c-1 0-1.6-.7-1.6-1.6V12c0-1 .7-1.7 1.6-1.7h13.4c1 0 1.6.8 1.6 1.7zm-5 3.3l-5-2.7V18l5-2.7z'></StyledPath>
      </g>
    </StyledSvg>
  );
};

export default SubscriptionIcon;
