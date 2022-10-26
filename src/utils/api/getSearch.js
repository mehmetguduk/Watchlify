/*
  THIS FILE WAS DEVELOPED BY MEHMET GUDUK
  © 2022 COPYRIGHT, LICENSED WITH GPL-3.0 LICENSE, AUTHOR IS MEHMET GUDUK
  https://github.com/mehmetguduk
*/

async function getSearch(string) {
  let response;
  await fetch(`http://api.tvmaze.com/search/shows?q=${encodeURIComponent(string)}`)
    .then(response => response.json())
    .then(jsonData => { 
      
      response = jsonData 
      console.log(response)
    })
    .catch(error => { response = error })
  return response
};

export default getSearch
