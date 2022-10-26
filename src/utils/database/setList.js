/*
  THIS FILE WAS DEVELOPED BY MEHMET GUDUK
  © 2022 COPYRIGHT, LICENSED WITH GPL-3.0 LICENSE, AUTHOR IS MEHMET GUDUK
  https://github.com/mehmetguduk
*/

function setList(newLIST) {
  localStorage.setItem("WATCHLIST", JSON.stringify(newLIST))
}

export default setList;