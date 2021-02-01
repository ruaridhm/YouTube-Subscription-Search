import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';
import getSubVideos from '../getSubVideos';
import getVideoDetails from '../getVideoDetails';
//List views
import SubscriptionItem from './SubscriptionItem';
//svg
import list from '../SVG/list.svg';
import listDetails from '../SVG/detailedList.svg';
import details from '../SVG/details.svg';

const SubscriptionSelectContainer = styled.form`
  width: 80%;
  margin: 0 auto;
  color: ${(props) => props.theme.white};
  font-size: ${(props) => props.theme.mediumSmall};
`;

const SubscriptionSelectHeader = styled.h2`
  color: ${(props) => props.theme.white};
  font-size: ${(props) => props.theme.mediumLarge};
  margin: 0 auto;
  width: fit-content;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 1rem;
`;

const DisplaySizesContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const SubscriptionSelect = ({
  subResults,
  selectedSubs,
  setSelectedSubs,
  setSubVideoArr,
  setShowSubscriptionSelect,
  setShowSearchBar,
  setVideoDetails,
  subVideoArr,
}) => {
  const [displayType, setDisplayType] = useState('Details');

  const getSubscriptionsVideos = () => {
    getSubVideos(selectedSubs, setSubVideoArr);

    //get video details
    getVideoDetails(subVideoArr, setVideoDetails);

    setShowSearchBar(true);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    selectedSubs.length === 0
      ? alert('please select at least one subscription')
      : getSubscriptionsVideos();
    setShowSubscriptionSelect(false);
  };
  const selectAllHandler = (e) => {
    e.preventDefault();
    setSelectedSubs(subResults);
    console.log('hide subSelect and show search ');
    getSubscriptionsVideos();
    setShowSubscriptionSelect(false);
  };
  return (
    <>
      <SubscriptionSelectHeader>
        Please select which of your subscriptions to search
      </SubscriptionSelectHeader>
      <SubscriptionSelectContainer>
        <ButtonContainer>
          <Button title='Select All' onClick={selectAllHandler} />
          <Button title='Submit' onClick={submitHandler} />
        </ButtonContainer>
        <DisplaySizesContainer>
          <Button
            children={<img src={list} alt='List View' />}
            onClick={(e) => {
              e.preventDefault();
              setDisplayType('List');
            }}
          ></Button>
          <Button
            children={<img src={listDetails} alt='Detailed List View' />}
            onClick={(e) => {
              e.preventDefault();
              setDisplayType('ListDetails');
            }}
          />
          <Button
            children={<img src={details} alt='Details View' />}
            onClick={(e) => {
              e.preventDefault();
              setDisplayType('Details');
            }}
          />
        </DisplaySizesContainer>

        {subResults.map((element) => {
          return (
            <SubscriptionItem
              item={element}
              key={element.channelId}
              selectedSubs={selectedSubs}
              setSelectedSubs={setSelectedSubs}
              displayType={displayType}
            />
          );
        })}
      </SubscriptionSelectContainer>
    </>
  );
};

export default SubscriptionSelect;
