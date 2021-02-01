import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FilterCategory from './FilterCategory';

const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: ${(props) => props.theme.mediumSmall};
  color: ${(props) => props.theme.greyLight};
  font-family: 'Roboto-400';
  height: 36px;
  cursor: pointer;
  width: fit-content;
  padding: 1rem;
  user-select: none;

  //if expanded is true change color to match hover colour

  &:hover {
    color: ${(props) => props.theme.white};
  }
`;

const FilterIconContainer = styled.div`
  height: 1.5rem;
  width: 1.5rem;
  margin-right: 0.5rem;
`;

const FilterIcon = styled.svg`
  pointer-events: none;
  display: block;
  width: 100%;
  height: 100%;
`;
const StyledPath = styled.path`
  fill: ${(props) => props.theme.greyLight};
  ${FilterContainer}:hover & {
    fill: ${(props) => props.theme.white};
  }
`;

const ExpandedFilter = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  margin-left: 1.1rem;
`;
const Filter = ({
  subResultsArr,
  filterUploadDate,
  setFilterUploadDate,
  filterChannels,
  setFilterChannels,
  filterSortBy,
  setFilterSortBy,
  searchResultsArr,
  setFilteredResults,
}) => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(false);
  }, [filterUploadDate, filterChannels, filterSortBy]);

  const expandHandler = () => {
    setExpanded(!expanded);
  };
  return (
    <>
      <FilterContainer onClick={expandHandler}>
        <FilterIconContainer>
          <FilterIcon viewBox='0 0 24 24'>
            <g>
              <path d='M0 0h24v24H0z' fill='none'></path>
              <StyledPath d='M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z'></StyledPath>
            </g>
          </FilterIcon>
        </FilterIconContainer>
        FILTER
      </FilterContainer>
      {expanded && (
        <ExpandedFilter>
          <FilterCategory
            state={searchResultsArr}
            updateState={setFilteredResults}
            category='UPLOAD DATE'
            options={[
              ['Last hour', 3600000],
              ['Today', 86400000],
              ['This week', 604800000],
              ['This month', 2629746000],
              ['This year', 31556952000],
            ]}
            filter={filterUploadDate}
            setFilter={setFilterUploadDate}
            searchResultsArr={searchResultsArr}
          />
          {/* {
            <FilterCategory2
              category='CHANNELS'
              options={filteredSubResultsArr}
              type='list'
              state={filterChannels}
            updateState={setFilterChannels}
            />
          } */}
          <FilterCategory
            state={searchResultsArr}
            updateState={setFilteredResults}
            category='SORT BY'
            options={[
              //Need a relevance algorithm to look through titles and body for matching search term and weight findings accordingly. then organize list by weight score
              ['Relevance'],
              //Easiest to implement. get each published date and organize by that
              ['Upload date'],
              //need to do an additional api call for videos to get view count according to initial research
              ['View count'],
              //like
              ['Rating'],
            ]}
            filter={filterSortBy}
            setFilter={setFilterSortBy}
            searchResultsArr={searchResultsArr}
          />
        </ExpandedFilter>
      )}
    </>
  );
};

export default Filter;
