import React from 'react'
import getSearchById from '../../utils/api/getSearchById'
import getEpisodes from '../../utils/api/getEpisodes'
import { groupBy } from 'lodash';
import setList from '../../utils/database/setList';

export default function SearchResults(props) {

  function handleResultClick(event) {
    event.target.closest('li.result').classList.toggle('inlist')
    let clickedShowId = Number(event.target.closest("li.result").id)
    let isElement = props.watchList.filter(watch => watch.id === clickedShowId)

    if (isElement.length !== 0) {
      props.setWatchList(prevWatchList => {
        let index = props.watchList.indexOf(isElement[0])
        prevWatchList.splice(index, 1)
        setList(prevWatchList)
        return prevWatchList
      })
    }
    else {
      getSearchById(clickedShowId).then(response => {
        if (response.id) {
          props.setWatchList(prevWatchList => {
            prevWatchList.splice(0, 0, response)
            setList(prevWatchList)
            return prevWatchList
          })
        }
      })
      getEpisodes(clickedShowId).then(response => {
        let seasons = []
        Object.keys(groupBy(response, "season")).map(season => {
          const episodes = groupBy(response, "season")[season]
          seasons.push(episodes)
        })
        props.setWatchList(prevWatchList => {
          prevWatchList[0].seasons = seasons
          prevWatchList[0].watched = []
          prevWatchList[0].episodeCount = response.length
          setList(prevWatchList)
          return prevWatchList
        })
      })
    }
  }

  return (
    <ul className='search-results'>
      {
        props.searchResults.map(result => {
          let resultId = result.show.id ? result.show.id : 'Unknown';
          let resultName = result.show.name ? result.show.name : 'Unknown';
          let resultImage = result.show.image ? result.show.image.medium : 'https://via.placeholder.com/210x295';
          let resultClass = props.watchList.some(show => show.id === Number(resultId)) ? "result inlist" : "result"

          return (
            <li
              className={resultClass}
              id={resultId}
              key={resultId}
              onClick={handleResultClick}
            >
              <img className="result-image" src={resultImage} alt='Result Cover' />
              <h5 className="result-name">{resultName}</h5>
            </li>
          )
        })
      }
    </ul>
  )
}