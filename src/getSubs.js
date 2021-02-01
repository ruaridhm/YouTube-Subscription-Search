/* global gapi */

const getAllSubscriptions = (
  setSubResultsArr,
  setShowSubscriptionSelect,
  userId
) => {
  const store = require('store');

  const getSubscription = (setSubResultsArr, userId, pageToken) => {
    return gapi.client.youtube.subscriptions
      .list({
        part: ['snippet,contentDetails'],
        channelId: userId,
        order: 'alphabetical',
        maxResults: 50,
        pageToken: pageToken,
      })
      .then(
        function (response) {
          // Handle the results here (response.result has the parsed body).
          console.log('Response', response);
          response.result.items.forEach((element) => {
            setSubResultsArr((prevState) => [
              ...prevState,
              {
                channelId: element.snippet.resourceId.channelId,
                title: element.snippet.title,
                description: element.snippet.description,
                thumbnails: element.snippet.thumbnails.default.url,
                totalItems: element.contentDetails.totalItemCount,
                newItems: element.contentDetails.newItemCount,
                selected: false,
                videos: [],
              },
            ]);
          });

          if (response.result.nextPageToken) {
            console.log('if');
            console.log(response.result.nextPageToken);
            pageToken = response.result.nextPageToken;
            getSubscription(setSubResultsArr, userId, pageToken);
          } else {
            console.log('else hit inner loop returned');
            return;
          }
        },
        function (err) {
          console.error('Execute error', err);
        }
      );
  };

  const subArrFromLocalStorage = store.get('subResultsArr');

  //checks if Subscription lists are stored in local storage and sets them to state if they exist. else calls getSubscription to fetch them from YouTube api.
  if (subArrFromLocalStorage !== undefined) {
    console.info('Sub Results found in local storage');
    setSubResultsArr(subArrFromLocalStorage);
  } else {
    console.warn('Sub Results not found in local storage');
    getSubscription(setSubResultsArr, userId);
  }
  setShowSubscriptionSelect(true);
};

export default getAllSubscriptions;
