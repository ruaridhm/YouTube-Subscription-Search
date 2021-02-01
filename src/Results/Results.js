import React, { useState, useEffect } from 'react';
import Spinner from '../Spinner/Spinner';
import Filter from '../Filter/Filter';
import Result from './Result';
import styled from 'styled-components';

const ResultsContainer = styled.div`
  padding-top: 3.25rem;
  color: ${(props) => props.theme.white};
  max-width: 70%;
  margin: 0 auto;
  @media (max-width: 1085px) {
    max-width: 80%;
  }
  @media (max-width: 830px) {
  }
  @media (max-width: 530px) {
  }
`;
const HorizontalRule = styled.hr`
  border: 1px ${(props) => props.theme.greyMediumDark} solid;
`;

const ResultCount = styled.p``;

const Results = ({
  searchResultsArr,
  subResultsArr,
  setVideoDetails,
  loadingResults,
  setLoadingResults,
}) => {
  const [filterUploadDate, setFilterUploadDate] = useState('');
  const [filterChannels, setFilterChannels] = useState('');
  const [filterSortBy, setFilterSortBy] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    setFilteredResults(searchResultsArr);
  }, [searchResultsArr]);

  return (
    <ResultsContainer>
      <Filter
        subResultsArr={subResultsArr}
        filterUploadDate={filterUploadDate}
        filterChannels={filterChannels}
        filterSortBy={filterSortBy}
        setFilterUploadDate={setFilterUploadDate}
        setFilterChannels={setFilterChannels}
        setFilterSortBy={setFilterSortBy}
        searchResultsArr={searchResultsArr}
        setFilteredResults={setFilteredResults}
      />
      <HorizontalRule />

      {loadingResults && <Spinner />}

      {!loadingResults && (
        <ResultCount>
          {filteredResults.length === 1
            ? `${filteredResults.length} Result found.`
            : filteredResults === 0
            ? 'No results found.'
            : `${filteredResults.length} Results found.`}
        </ResultCount>
      )}

      {filteredResults.map((element) => (
        <Result
          key={element.videoId}
          thumbnail={element.thumbnail}
          title={element.title}
          date={element.published}
          channelIcon={null}
          channelName={element.channelTitle}
          description={element.description}
          length='4:47'
          views='16K views'
          videoId={element.videoId}
        />
      ))}
    </ResultsContainer>
  );
};

export default Results;
