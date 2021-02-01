import React from 'react';
import styled from 'styled-components';
import YouTubeLogo from '../SVG/YouTubeLogo';

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  cursor: pointer;
  width: fit-content;
  margin: 0 auto;
  user-select: none;
`;

const LogoAddOn = styled.h1`
  color: ${(props) => props.theme.white};
  font-family: 'Trade-Gothic';
  font-size: ${(props) => props.theme.extraLarge};
  letter-spacing: 0px;

  @media (max-width: 1085px) {
    display: none;
  }
`;

const MobileLogoAddOn = styled(LogoAddOn)`
  display: none;
  @media (max-width: 1085px) {
    display: block;
  }
  @media (max-width: 830px) {
    display: block;
    font-size: ${(props) => props.theme.large};
  }
  @media (max-width: 530px) {
    display: block;
    font-size: ${(props) => props.theme.mediumLarge};
  }
`;

const Logo = () => {
  return (
    <LogoContainer onClick={() => window.location.reload(false)}>
      <YouTubeLogo />
      <LogoAddOn> YouTube Subscription Search</LogoAddOn>
      <MobileLogoAddOn>YouTube Subs Search</MobileLogoAddOn>
    </LogoContainer>
  );
};

export default Logo;
