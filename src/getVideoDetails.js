/* global gapi */

const getVideoDetails = (subVideoArr, setVideoDetails) => {
  const videoIdArr = [];
  subVideoArr.forEach((element) => {
    videoIdArr.push(element.videoId);
  });
  return gapi.client.youtube.videos
    .list({
      part: ['snippet,contentDetails,statistics'],
      id: [videoIdArr],
    })
    .then(
      function (response) {
        // Handle the results here (response.result has the parsed body).
        console.log('Response', response);

        response.result.items.forEach((element, iterator) => {
          setVideoDetails((prevState) => [
            ...prevState,
            {
              channelId: subVideoArr[iterator].channelId,
              channelTitle: element.snippet.channelTitle,
              description: element.snippet.description,
              videoTitle: element.snippet.title,
              videoId: subVideoArr[iterator].videoId,
              published: element.snippet.publishedAt,
              tags: element.snippet.tags,
              categoryId: element.snippet.categoryId,
              defaultLanguage: element.snippet.defaultLanguage,
              defaultAudioLanguage: element.snippet.defaultAudioLanguage,
              duration: element.contentDetails.duration,
              thumbnail: element.snippet.thumbnails.standard,
              dimension: element.contentDetails.dimension,
              definition: element.contentDetails.definition,
              caption: element.contentDetails.caption,
              licensed: element.contentDetails.licensedContent,
              contentRating: element.contentDetails.contentRating,
              viewCount: element.statistics.viewCount,
              likeCount: element.statistics.likeCount,
              dislikeCount: element.statistics.dislikeCount,
              favoriteCount: element.statistics.favoriteCount,
              commentCount: element.statistics.commentCount,
            },
          ]);
        });
      },
      function (err) {
        console.error('Execute error', err);
      }
    );
};

export default getVideoDetails;
