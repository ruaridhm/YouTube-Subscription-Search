/* global gapi */
import getLoggedInChannelId from './getLoggedInChannelId';

export const authHandler = (setSignedIn, setUserDetails) => {
  authenticate(setSignedIn, setUserDetails).then(loadClient);
};

const authenticate = (setSignedIn, setUserDetails) => {
  return gapi.auth2
    .getAuthInstance()
    .signIn({ scope: 'https://www.googleapis.com/auth/youtube.readonly' })
    .then(
      function (response) {
        console.info('Sign-in successful');
        setUserDetails([response.Fs.sd]);
        getLoggedInChannelId(setUserDetails);
        setSignedIn(true);
      },
      function (err) {
        console.error('Error signing in', err);
      }
    );
};

const loadClient = () => {
  gapi.client.setApiKey(process.env.REACT_APP_API_KEY);
  return gapi.client
    .load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest')
    .then(
      function () {
        console.info('GAPI client loaded for API');
      },
      function (err) {
        console.error('Error loading GAPI client for API', err);
      }
    );
};

gapi.load('client:auth2', function () {
  gapi.auth2.init({
    client_id: process.env.REACT_APP_CLIENT_ID,
  });
});

export default authHandler;
