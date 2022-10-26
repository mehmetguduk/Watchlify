/*
  THIS FILE WAS DEVELOPED BY MEHMET GUDUK
  © 2022 COPYRIGHT, LICENSED WITH GPL-3.0 LICENSE, AUTHOR IS MEHMET GUDUK
  https://github.com/mehmetguduk
*/

async function getEpisodes(id) {
  let response;
  await fetch(`http://api.tvmaze.com/shows/${id}/episodes`)
    .then(response => response.json())
    .then(jsonData => { response = jsonData })
    .catch(error => { response = error })
  return response
};

export default getEpisodes
