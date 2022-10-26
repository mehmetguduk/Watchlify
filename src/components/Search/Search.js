import React from "react"
import getSearch from "../../utils/api/getSearch"
import SearchResults from "./SearchResults"
import './Search.scss'
import watchlifyTransparent from "../../images/watchlifyTransparent.png"


export default function Search(props) {
  const [searchValue, setSearchValue] = React.useState("")
  const [searchResults, setSearchResults] = React.useState([])

  function handleInputChange(event) {
    setSearchValue(event.target.value)
  }

  function handleSubmit(event) {
    getSearch(searchValue).then(response => {
      setSearchResults(response)
    })
    setSearchValue("")
    event.preventDefault()
  }

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="text"
          placeholder="📺 Search for a Show"
          value={searchValue}
          name="search"
          onChange={handleInputChange}
          autoComplete="off"
        />
        <button
          className="search-button"
          type="submit">
          Search
        </button>
      </form>

      {
        searchResults.length === 0 ?
          <div className="no-search-container">
            <img className="no-search-logo" src={watchlifyTransparent} alt='Watchlify Logo' />
            <h5 className="no-search-text">Search for a show and add to your watchlist.</h5>
          </div> : <></>
      }

      <SearchResults
        searchResults={searchResults}
        setSearchResults={setSearchResults}
        watchList={props.watchList}
        setWatchList={props.setWatchList}
      />
    </div>
  )
}