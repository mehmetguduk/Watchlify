async function getSearchById(id) {
  let response;
  await fetch(`https://api.tvmaze.com/shows/${id}`)
    .then(response => response.json())
    .then(jsonData => { response = jsonData })
    .catch(error => { response = error })
  return response
};

export default getSearchById
