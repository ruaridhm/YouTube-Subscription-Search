/* global gapi */
const getLoggedInChannelId = (setUserDetails) => {
  console.log('getLoggedinId');
  return gapi.client.youtube.channels
    .list({
      mine: true,
    })
    .then(
      function (response) {
        // Handle the results here (response.result has the parsed body).
        setUserDetails((prevState) => [
          ...prevState,
          response.result.items[0].id,
        ]);
      },
      function (err) {
        console.error('Execute error', err);
      }
    );
};

export default getLoggedInChannelId;
