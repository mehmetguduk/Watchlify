/*
  THIS FILE WAS DEVELOPED BY MEHMET GUDUK
  © 2022 COPYRIGHT, LICENSED WITH GPL-3.0 LICENSE, AUTHOR IS MEHMET GUDUK
  https://github.com/mehmetguduk
*/

function getList() {
  if ("WATCHLIST" in localStorage) {
    return JSON.parse(localStorage.getItem("WATCHLIST"))
  }
  else {
    let emptyArray = []
    localStorage.setItem("WATCHLIST", JSON.stringify(emptyArray))
    return emptyArray
  }
}

export default getList;