const sortBy = (updateState, element, searchResultsArr) => {
  console.log('SortBy.js');

  const sortByRelevance = () => {
    console.log('relevance');
  };
  const sortByUploadDate = () => {
    let tempArr = [...searchResultsArr];
    tempArr.sort(function compare(a, b) {
      let dateA = new Date(a.published);
      let dateB = new Date(b.published);
      return dateA - dateB;
    });
    return tempArr;
  };
  const sortByViewCount = () => {
    console.log('view Count');
  };
  const sortByRating = () => {
    console.log('rating');
  };

  switch (element[0]) {
    case 'Relevance':
      sortByRelevance();
      break;
    case 'Upload date':
      updateState(sortByUploadDate());
      break;
    case 'View count':
      sortByViewCount();
      break;
    case 'Rating':
      sortByRating();
      break;

    default:
      console.error('Default case hit,');
      break;
  }
};

export default sortBy;
