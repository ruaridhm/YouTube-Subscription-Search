/* global gapi */

export const searchAll = (
  searchQuery,
  search,
  searchResultsArr,
  setSearchResultsArr,
  selectedSubs,
  setResultsLooping,
  setLoadingResults
) => {
  setSearchResultsArr([]);

  selectedSubs.map(({ channelId }) => {
    return search(searchQuery, channelId, setSearchResultsArr);
  });
  setResultsLooping(false);
  setLoadingResults(false);
};

export const search = (
  //Default test value remove for production
  searchQuery,
  channelId,
  setSearchResultsArr
) => {
  return gapi.client.youtube.search
    .list({
      part: ['snippet'],
      maxResults: 50,
      q: searchQuery,
      channelId: channelId,
      type: 'video',
    })
    .then(
      function (response) {
        console.info('response');
        console.log(response);
        // Handle the results here (response.result has the parsed body).
        response.result.items.forEach((result) => {
          setSearchResultsArr((prevState) => [
            ...prevState,
            {
              videoId: result.id.videoId,
              channelId: result.snippet.channelId,
              channelTitle: result.snippet.channelTitle,
              title: result.snippet.title,
              description: result.snippet.description,
              thumbnail: result.snippet.thumbnails.medium.url,
              published: result.snippet.publishedAt,
            },
          ]);
        });
        if (response.result.items.length < 50) {
          console.info(`search final round for ${channelId} finished`);
          console.count(['Search Final Round']);
          return;
        } else {
          console.info(`search round for ${channelId} finished`);
          console.count(['Search Round']);
          return;
        }
      },
      function (err) {
        console.error('Execute error', err);
      }
    );
};
