import React from 'react';
import { search, searchAll } from '../getResults';
import styled from 'styled-components';

const SearchForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 64%;
  margin: 0 auto;
  @media (max-width: 1085px) {
    width: 80%;
  }
`;

const SearchInput = styled.input`
  background-color: ${(props) => props.theme.greyDarkest};
  border: none;
  height: 2rem;
  width: 100%;
  padding-left: 0.75rem;
  color: ${(props) => props.theme.greyLight};
  outline: none;
  border: 1px solid ${(props) => props.theme.greyMedium};
  &:focus {
    border: 1px solid ${(props) => props.theme.blue};
  }
`;

const SearchLabel = styled.label`
  width: 100%;
`;

const SearchButton = styled.button`
  height: 2rem;
  width: 4rem;
  border: none;
  background-color: ${(props) => props.theme.greyMedium};
`;
const SearchIcon = styled.svg`
  pointer-events: none;
  display: block;
  width: 1.25rem;
  height: 1.25rem;
  margin: 0 auto;
`;
const StyledPath = styled.path`
  fill: ${(props) => props.theme.greyLighter};
  ${SearchButton}:hover & {
    fill: ${(props) => props.theme.greyLight};
  }
`;

const Search = ({
  searchQuery,
  setSearchQuery,
  searchResultsArr,
  setSearchResultsArr,
  selectedSubs,
  setResultsLooping,
  setLoadingResults,
}) => {
  const submitHandler = (e) => {
    e.preventDefault();
    searchAll(
      searchQuery,
      search,
      searchResultsArr,
      setSearchResultsArr,
      selectedSubs,
      setResultsLooping,
      setLoadingResults
    );
  };

  return (
    <SearchForm onSubmit={submitHandler}>
      <SearchLabel>
        <SearchInput
          type='text'
          placeholder='Search'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchLabel>
      <SearchButton type='submit'>
        <SearchIcon
          viewBox='0 0 24 24'
          preserveAspectRatio='xMidYMid meet'
          focusable='false'
        >
          <g>
            <StyledPath d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'></StyledPath>
          </g>
        </SearchIcon>
      </SearchButton>
    </SearchForm>
  );
};

export default Search;
