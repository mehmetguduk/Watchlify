function getList() {
  if ("WATCHLIST" in localStorage) {
    return JSON.parse(localStorage.getItem("WATCHLIST"))
  }
  else {
    return []
  }
}

export default getList;