import React from 'react';
import styled from 'styled-components';
import uploadDate from './uploadDate';
import sortBy from './sortBy';

const CategoryContainer = styled.div``;
const Title = styled.h4`
  font-weight: normal;
  font-size: ${(props) => props.theme.mediumSmall};
  margin-top: 1rem;
  margin-bottom: 1rem;
`;
const HorizontalRule = styled.hr`
  border: 1px ${(props) => props.theme.greyMediumDark} solid;
`;
const OptionsContainer = styled.form`
  margin-bottom: 1rem;
`;

const OptionContainer = styled.div`
  color: ${(props) => props.theme.greyLight};
  user-select: none;
  display: flex;
  padding-top: 1rem;
`;
const Option = styled.input`
  display: none;
`;

const Label = styled.label`
  cursor: pointer;
  font-size: ${(props) => props.theme.mediumSmall};
`;

const CancelFilter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 0.25rem;
  height: 20px;
  width: 20px;
  cursor: pointer;
`;

const StyledSVG = styled.svg`
  pointer-events: none;
  display: block;
  width: 100%;
  height: 100%;
  fill: #fff;
`;

const onClickHandler = (
  updateState,
  element,
  filter,
  setFilter,
  searchResultsArr,
  category
) => {
  if (filter === element[0]) {
    setFilter('');
    updateState(searchResultsArr);
  } else {
    setFilter(element[0]);

    switch (category) {
      case 'UPLOAD DATE':
        uploadDate(updateState, element, searchResultsArr);
        break;
      case 'SORT BY':
        sortBy(updateState, element, searchResultsArr);
        break;

      default:
        console.error(
          'switch statement in onClickHandler for FilterCategory hit default!'
        );
        break;
    }
  }
};

const FilterCategory = ({
  category,
  options,
  updateState,
  filter,
  setFilter,
  searchResultsArr,
}) => {
  return (
    <CategoryContainer>
      <Title>{category}</Title>
      <HorizontalRule />
      <OptionsContainer>
        {options.map((element) => (
          <OptionContainer>
            <Option
              type='radio'
              key={element[0]}
              id={element[0]}
              name={category}
              value={searchResultsArr}
              onClick={() => {
                onClickHandler(
                  updateState,
                  element,
                  filter,
                  setFilter,
                  searchResultsArr,
                  category
                );
              }}
            />
            <Label htmlFor={element[0]}>{element[0]}</Label>

            {filter === element[0] && (
              <CancelFilter
                onClick={() => {
                  onClickHandler(
                    updateState,
                    element,
                    filter,
                    setFilter,
                    searchResultsArr,
                    category
                  );
                }}
              >
                <StyledSVG
                  viewBox='0 0 24 24'
                  preserveAspectRatio='xMidYMid meet'
                  focusable='false'
                >
                  <g>
                    <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'></path>
                  </g>
                </StyledSVG>
              </CancelFilter>
            )}
          </OptionContainer>
        ))}
      </OptionsContainer>
    </CategoryContainer>
  );
};

export default FilterCategory;
