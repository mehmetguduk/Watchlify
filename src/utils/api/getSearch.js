async function getSearch(string) {
  let response;
  await fetch(`http://api.tvmaze.com/search/shows?q=${encodeURIComponent(string)}`)
    .then(response => response.json())
    .then(jsonData => { response = jsonData })
    .catch(error => { response = error })
  return response
};

export default getSearch
