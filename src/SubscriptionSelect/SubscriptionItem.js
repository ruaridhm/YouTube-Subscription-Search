import React, { useState } from 'react';
import styled from 'styled-components';

const SubscriptionItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  align-items: center;
  user-select: none;
  border-radius: 0.5rem;
  margin: 1rem;
  padding-right: 0.5rem;
  border: 2px solid transparent;

  border: ${(props) => props.active && `2px solid ${props.theme.blue}`};
`;

const SubscriptionImage = styled.img`
  height: fit-content;
  width: fit-content;
  border-radius: 50%;
  margin: 1rem;
`;
const ListSubscriptionImage = styled(SubscriptionImage)`
  height: 2.5rem;
  width: 2.5rem;
  margin: 0.5rem 1rem;
`;

const ListDetailsSubscriptionImage = styled(SubscriptionImage)`
  height: 4rem;
  width: 4rem;
`;

const SubscriptionTitle = styled.h3`
  font-size: ${(props) => props.theme.medium};
  width: fit-content;
  border-bottom: 2px solid transparent;
  border-bottom: ${(props) => props.active && `2px solid ${props.theme.blue}`};
`;

const ListDetailsSubscriptionTitle = styled(SubscriptionTitle)`
  white-space: nowrap;
`;
const SubscriptionDescription = styled.p`
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;
const ListDetailsSubscriptionDescription = styled(SubscriptionDescription)`
  -webkit-line-clamp: 1;
  margin-left: 1.5rem;
`;

const SubscriptionItem = ({
  item,
  selectedSubs,
  setSelectedSubs,
  displayType,
  selected,
}) => {
  const [active, setActive] = useState(false);

  const onClickHandler = () => {
    setActive((prevState) => !prevState);
    selectedSubs.includes(item)
      ? setSelectedSubs(selectedSubs.filter((element) => element !== item))
      : setSelectedSubs((prevState) => [...prevState, item]);
  };
  return (
    <>
      {displayType === 'Details' ? (
        <SubscriptionItemContainer onClick={onClickHandler} active={active}>
          <SubscriptionImage src={item.thumbnails} alt={item.title} />
          <div>
            <SubscriptionTitle active={active}>{item.title}</SubscriptionTitle>
            <SubscriptionDescription>
              {item.description}
            </SubscriptionDescription>
          </div>
        </SubscriptionItemContainer>
      ) : displayType === 'List' ? (
        <SubscriptionItemContainer onClick={onClickHandler} active={active}>
          <ListSubscriptionImage src={item.thumbnails} alt={item.title} />
          <div>
            <SubscriptionTitle active={active}>{item.title}</SubscriptionTitle>
          </div>
        </SubscriptionItemContainer>
      ) : displayType === 'ListDetails' ? (
        <SubscriptionItemContainer onClick={onClickHandler} active={active}>
          <ListDetailsSubscriptionImage
            src={item.thumbnails}
            alt={item.title}
          />

          <ListDetailsSubscriptionTitle active={active}>
            {item.title}
          </ListDetailsSubscriptionTitle>
          <ListDetailsSubscriptionDescription>
            {item.description}
          </ListDetailsSubscriptionDescription>
        </SubscriptionItemContainer>
      ) : null}
    </>
  );
};

export default SubscriptionItem;
