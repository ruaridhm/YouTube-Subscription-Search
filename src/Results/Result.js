import React from 'react';
import styled from 'styled-components';

const ResultContainer = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  margin-top: 0.75rem;
`;
const ResultImageContainer = styled.div`
  margin-right: 1rem;
`;
const ResultImage = styled.img``;

const ImageTimeStamp = styled.span``;

const ResultInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.greyLight};
  font-size: ${(props) => props.theme.mediumSmall};
  font-weight: 400;
`;
const ResultTitle = styled.h3`
  font-size: ${(props) => props.theme.medium};
  margin: 0;
  color: ${(props) => props.theme.white};
  font-weight: 400;
  line-height: 24px;
  font-family: 'Roboto-300';
`;
const ResultViewsAndDateContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: ${(props) => props.theme.mediumSmall};
  padding-bottom: 0.75rem;
`;
const ResultViews = styled.span`
  padding-right: 1rem;
`;

const ResultDate = styled.span``;

const ResultChannelContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const ResultChannelIcon = styled.img``;

const ResultChannelName = styled.span``;

const ResultDescription = styled.p`
  line-height: 18px;
  font-weight: 300;
`;

const Result = ({
  thumbnail,
  title,
  date,
  channelIcon,
  channelName,
  description,
  length,
  views,
  videoId,
}) => {
  const calculateTimeAgo = () => {
    const calculateTime = () => {
      const timeDifference = Date.now() - new Date(date).getTime();
      const numbSec = timeDifference / 1000;
      const numbMin = numbSec / 60;
      const numbHour = numbMin / 60;
      const numbDay = numbHour / 24;
      const numbWeek = numbDay / 7;
      const numbMonth = numbWeek / 4;
      const numbYear = numbMonth / 12;

      if (numbYear >= 1) {
        return `${Math.floor(numbYear)} Year`;
      } else if (numbMonth >= 1) {
        return `${Math.floor(numbMonth)} Month`;
      } else if (numbWeek >= 1) {
        return `${Math.floor(numbWeek)} Week`;
      } else if (numbDay >= 1) {
        return `${Math.floor(numbDay)} Day`;
      } else if (numbHour >= 1) {
        return `${Math.floor(numbHour)} Hour`;
      } else if (numbMin >= 1) {
        return `${Math.floor(numbMin)} Minutes`;
      } else if (numbSec >= 1) {
        return `${Math.floor(numbSec)} Seconds`;
      }
    };

    let timeAgo = calculateTime();
    if (timeAgo[0] > 1) {
      timeAgo = timeAgo + 's';
    }

    return timeAgo;
  };

  const handleClick = (videoId) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`);
  };

  return (
    <ResultContainer
      onClick={() => {
        handleClick(videoId);
      }}
    >
      <ResultImageContainer>
        <ResultImage src={thumbnail} alt='' />
        {/* <ImageTimeStamp>{length}</ImageTimeStamp> */}
      </ResultImageContainer>
      <ResultInfo>
        <ResultTitle>{title}</ResultTitle>
        <ResultViewsAndDateContainer>
          <ResultViews>{views}</ResultViews>
          <ResultDate>{calculateTimeAgo()} ago</ResultDate>
        </ResultViewsAndDateContainer>
        <ResultChannelContainer>
          <ResultChannelIcon src={channelIcon} />
          <ResultChannelName>{channelName}</ResultChannelName>
        </ResultChannelContainer>
        <ResultDescription>{description}</ResultDescription>
      </ResultInfo>
    </ResultContainer>
  );
};

export default Result;
