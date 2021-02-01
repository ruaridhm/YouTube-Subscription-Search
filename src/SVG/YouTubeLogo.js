import React from 'react';
import styled from 'styled-components';

const StyledSvg = styled.svg`
  pointer-events: none;
  display: block;
  width: 100px;
  height: 60px;
  @media (max-width: 830px) {
    height: 45px;
    width: 75px;
  }
  @media (max-width: 530px) {
    height: 30px;
    width: 50px;
  }
`;

const StyledPath = styled.path`
  /* fill: ${(props) => props.theme.redYoutube}; */
  fill: #ff0000;
`;
const StyledPolygon = styled.polygon`
  /* fill: ${(props) => props.theme.white}; */
  fill: #fff;
`;

const YouTubeLogo = () => {
  return (
    <StyledSvg viewBox='32.5 8 1 44'>
      <StyledPath d='M63,14.87c-0.72-2.7-2.85-4.83-5.56-5.56C52.54,8,32.88,8,32.88,8S13.23,8,8.32,9.31 c-2.7,0.72-4.83,2.85-5.56,5.56C1.45,19.77,1.45,30,1.45,30s0,10.23,1.31,15.13c0.72,2.7,2.85,4.83,5.56,5.56 C13.23,52,32.88,52,32.88,52s19.66,0,24.56-1.31c2.7-0.72,4.83-2.85,5.56-5.56C64.31,40.23,64.31,30,64.31,30 S64.31,19.77,63,14.87z'></StyledPath>
      <StyledPolygon points='26.6,39.43 42.93,30 26.6,20.57'></StyledPolygon>
    </StyledSvg>
  );
};

export default YouTubeLogo;