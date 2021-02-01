const uploadDate = (stateArr, filterTime, searchResultsArr) => {
  const now = new Date();
  stateArr([]);
  searchResultsArr.forEach((element) => {
    const publishedDate = new Date(element.published);
    if (now.getTime() - publishedDate.getTime() <= filterTime[1]) {
      stateArr((prevState) => [...prevState, element]);
    }
  });
};

export default uploadDate;
