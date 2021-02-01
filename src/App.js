/* global gapi */
import { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import './App.css';
//Functions
import authHandler from './authenticate';
// import getLoggedInChannelId from './getLoggedInChannelId';
import getAllSubscriptions from './getSubs';
//Components
import Logo from './Logo/Logo';
import Button from './Button/Button';
import SubscriptionSelect from './SubscriptionSelect/SubscriptionSelect';
import Search from './Search/Search';
import Results from './Results/Results';
//Icons
import SignInIcon from './SVG/SignInIcon';
import SubscriptionIcon from './SVG/SubscriptionIcon';
//Theme
import { ColorVariables, FontVariables } from './variables.js';

//Store for localStorage (used to store subscriptions list)
var store = require('store');

const StyledApp = styled.div`
  background-color: ${(props) => props.theme.greyDark};
  height: 100%;
  min-height: 100vh;
`;

const WelcomeMessage = styled.h2`
  color: ${(props) => props.theme.white};
  font-size: ${(props) => props.theme.medium};
  letter-spacing: 0.75rem;
  margin: 0 auto;
  width: fit-content;
`;
const WelcomeSpan = styled.span`
  color: ${(props) => props.theme.redYouTube};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 1rem;
  width: 50%;
  margin: 0 auto;

  @media (max-width: 700px) {
    width: 80%;
  }
  @media (max-width: 440px) {
    width: 100%;
  }
`;

const App = () => {
  const [gapiReady, setGapiReady] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [userDetails, setUserDetails] = useState([]);

  const [subResultsArr, setSubResultsArr] = useState([]);
  const [selectedSubs, setSelectedSubs] = useState([]);
  const [subVideoArr, setSubVideoArr] = useState([]);
  const [videoDetails, setVideoDetails] = useState([]);
  const [showSubscriptionSelect, setShowSubscriptionSelect] = useState(false);

  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResultsArr, setSearchResultsArr] = useState([]);
  const [resultsLooping, setResultsLooping] = useState(true);
  const [loadingResults, setLoadingResults] = useState(true);

  const loadYouTubeApi = () => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';

    script.onload = () => {
      gapi.load('client', () => {
        gapi.client.setApiKey(process.env.REACT_APP_API_KEY);
        gapi.client.load('youtube', 'v3', () => {
          setGapiReady(true);
        });
      });
    };
    document.body.appendChild(script);
  };

  //On Page Load, Load the YouTube API
  useEffect(() => {
    loadYouTubeApi();
  }, []);
  //To reduce api calls useEffect stores subResultsArr  in local storage
  useEffect(() => {
    if (subResultsArr.length !== 0) {
      store.set('subResultsArr', subResultsArr);
    }
  }, [subResultsArr]);

  return (
    <ThemeProvider theme={ColorVariables}>
      <ThemeProvider theme={FontVariables}>
        <StyledApp className='App'>
          <Logo />
          {signedIn && userDetails && (
            <WelcomeMessage>
              <WelcomeSpan>Welcome</WelcomeSpan> {userDetails[0]}
            </WelcomeMessage>
          )}
          <ButtonContainer>
            {!signedIn && gapiReady && (
              <Button
                children={<SignInIcon />}
                title='SIGN IN'
                onClick={() => {
                  authHandler(
                    setSignedIn,
                    setUserDetails
                    // getLoggedInChannelId
                  );
                }}
              />
            )}

            {/*Button is shown when user is signedIn and hidden when subResultsArr is populated*/}
            {signedIn && subResultsArr.length === 0 && (
              <Button
                children={<SubscriptionIcon />}
                title='FETCH SUBSCRIPTIONS'
                onClick={() => {
                  getAllSubscriptions(
                    setSubResultsArr,
                    setShowSubscriptionSelect,
                    userDetails[1]
                  );
                }}
              />
            )}
          </ButtonContainer>

          {subResultsArr.length !== 0 && showSubscriptionSelect && (
            <SubscriptionSelect
              subResults={subResultsArr}
              selectedSubs={selectedSubs}
              setSelectedSubs={setSelectedSubs}
              setSubVideoArr={setSubVideoArr}
              setShowSubscriptionSelect={setShowSubscriptionSelect}
              setShowSearchBar={setShowSearchBar}
              setVideoDetails={setVideoDetails}
              subVideoArr={subVideoArr}
            />
          )}

          {showSearchBar && (
            <Search
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              searchResultsArr={searchResultsArr}
              setSearchResultsArr={setSearchResultsArr}
              selectedSubs={selectedSubs}
              setResultsLooping={setResultsLooping}
              setLoadingResults={setLoadingResults}
            />
          )}

          {!resultsLooping && (
            <Results
              searchResultsArr={searchResultsArr}
              subResultsArr={subResultsArr}
              setVideoDetails={setVideoDetails}
              loadingResults={loadingResults}
              setLoadingResults={setLoadingResults}
            />
          )}
        </StyledApp>
      </ThemeProvider>
    </ThemeProvider>
  );
};

export default App;
