function setList(newLIST) {
  localStorage.setItem("WATCHLIST", JSON.stringify(newLIST))
}

export default setList;