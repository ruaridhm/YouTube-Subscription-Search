/* global gapi */

// Make sure the client is loaded and sign-in is complete before calling this method.
const getSubVideos = (subResultsArr, setSubVideoArr) => {
  console.log(subResultsArr[0]);
  return gapi.client.youtube.search
    .list({
      channelId: subResultsArr[0].channelId,
      maxResults: 50,
      type: ['video'],
    })
    .then(function (response) {
      // Handle the results here (response.result has the parsed body).
      console.log('Response', response);

      response.result.items.forEach(
        (element) => {
          console.log(element);
          setSubVideoArr((prevState) => [
            ...prevState,
            {
              channelId: subResultsArr[0].channelId,
              videoId: element.id.videoId,
            },
          ]);
        },
        function (err) {
          console.error('Execute error', err);
        }
      );
    });
};

export default getSubVideos;
