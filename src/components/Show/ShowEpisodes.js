import React from 'react'
import setList from "../../utils/database/setList"

export default function ShowEpisodes(props) {

  function handleCompleteSeason(seasonIndex) {

  }

  function handleSeasonClick(event) {
    event.target.classList.toggle("active")
  }

  function handleEpisodeClick(event) {
    event.target.classList.toggle('watched')
    let show = props.watchList.filter(show => show.id === props.detailedShow.id)[0]
    let isEpisodeExists = show.watched.includes(event.target.id)

    if (isEpisodeExists) {
      props.setWatchList(prevWatchList => {

        let newWatchList = prevWatchList;

        let showIndex = newWatchList.indexOf(show)
        newWatchList[showIndex].watched = newWatchList[showIndex].watched.filter(episode => episode !== event.target.id)
        setList(newWatchList)
        return newWatchList
      })
    }
    else {
      console.log(`Is Exists : ${isEpisodeExists} // Adding : ${event.target.id}`)
      props.setWatchList(prevWatchList => {

        let newWatchList = prevWatchList;
        let showIndex = newWatchList.indexOf(show)

        console.log("before adding", newWatchList[showIndex].watched)

        newWatchList[showIndex].watched.push(event.target.id)

        console.log("after adding", newWatchList[showIndex].watched)
        setList(newWatchList)
        return newWatchList
      })
    }
  }

  function isAllSeasonWatched(seasonIndex) { }

  return (
    <div className='show-episodes-container'>
      {props.detailedShow.seasons.map((season, seasonIndex) => {
        return (
          <div className={`season-container season-${seasonIndex + 1}`} >
            <button
              className='season-complete'
              onClick={() => {
                handleCompleteSeason(seasonIndex)
              }}>
              Complete Season
            </button>
            <h5
              className='season-title'
              onClick={handleSeasonClick}
              watched={isAllSeasonWatched(seasonIndex) && "watched"}
            >
              {`Season ${seasonIndex + 1}`}
            </h5>
            <ul className='episodes-container'>
              {
                season.map((episode, episodeIndex) => {
                  return (
                    <li
                      className={
                        props.detailedShow.watched.includes(`S${seasonIndex + 1}E${episodeIndex + 1}`) ? `episode ${episodeIndex + 1} watched` : `episode ${episodeIndex + 1}`
                      }
                      id={`S${seasonIndex + 1}E${episodeIndex + 1}`}
                      key={`S${seasonIndex + 1}E${episodeIndex + 1}`}
                      onClick={handleEpisodeClick}
                    >
                      {episodeIndex + 1}. {episode.name}
                      <p className='episode-hover'>
                        {props.detailedShow.seasons[seasonIndex][episodeIndex].summary && props.detailedShow.seasons[seasonIndex][episodeIndex].summary.split('>')[1].split('<')[0]}
                      </p>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        )
      })}
    </div >
  )
}