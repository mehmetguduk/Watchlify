async function getEpisodes(id) {
  let response;
  await fetch(`http://api.tvmaze.com/shows/${id}/episodes`)
    .then(response => response.json())
    .then(jsonData => { response = jsonData })
    .catch(error => { response = error })
  return response
};

export default getEpisodes
