import React from 'react'
import setList from "../../utils/database/setList"
import './ShowEpisodes.scss'
import { TiTick } from "react-icons/ti";
import { IoIosArrowDown } from "react-icons/io";



export default function ShowEpisodes(props) {

  function handleCompleteSeason(seasonIndex) {
    let showRelated = props.watchList.filter(show => show.id === props.detailedShow.id)[0]
    props.watchList.forEach(show => {
      if (show === showRelated) {
        if (isAllSeasonWatched(seasonIndex)) {
          const newWatchList = props.watchList.map(show => {
            if (show === showRelated) {
              const updatedShow = {
                ...show,
                watched: show.watched.filter(episode => !(episode.startsWith(`S${seasonIndex + 1}`)))
              }
              return updatedShow
            }
            return show
          })
          setList(newWatchList)
          props.setWatchList(newWatchList)
        }
        else {
          function watchAll(show) {
            for (let i = 0; i < show.seasons[seasonIndex].length; i++) {
              let watched = `S${seasonIndex + 1}E${i + 1}`
              if (!(show.watched.includes(watched))) {
                show.watched.push(watched)
              }
            }
            return show
          }
          const newWatchList = props.watchList.map(show => {
            if (show === showRelated) {
              const updatedShow = {
                ...show,
                watched: watchAll(show).watched
              }
              return updatedShow
            }
            return show
          })
          setList(newWatchList)
          props.setWatchList(newWatchList)
        }
      }
    })
  }

  function handleSeasonClick(event) {
    console.log()
    if (event.target.nodeName !== 'svg' && event.target.nodeName !== 'path') {
      event.target.closest('div.season-title-container').classList.toggle("active")
    }
    else if (event.target.closest('svg.title-arrow') !== null) {
      event.target.closest('div.season-title-container').classList.toggle("active")
    }
  }

  function handleEpisodeClick(event) {
    event.target.classList.toggle('watched')
    let showRelated = props.watchList.filter(show => show.id === props.detailedShow.id)[0]
    let isEpisodeExists = showRelated.watched.includes(event.target.id)

    if (isEpisodeExists) {
      const newWatchList = props.watchList.map(show => {
        if (show === showRelated) {
          const updatedShow = {
            ...show,
            watched: show.watched.filter(episode => episode !== event.target.id)
          }
          return updatedShow
        }
        return show
      })
      setList(newWatchList)
      props.setWatchList(newWatchList)
    }
    else {
      const newWatchList = props.watchList.map(show => {
        if (show === showRelated) {
          const updatedShow = {
            ...show,
            watched: [...show.watched, event.target.id]
          }
          return updatedShow
        }
        return show
      })
      setList(newWatchList)
      props.setWatchList(newWatchList)
    }
  }

  function isAllSeasonWatched(seasonIndex) {
    let showRelated = props.watchList.filter(show => show.id === props.detailedShow.id)[0]
    let count = 0;
    showRelated.watched.forEach(episode => { if (episode.startsWith(`S${seasonIndex + 1}`)) { count++ } })
    if (showRelated.seasons[seasonIndex].length === count) { return true }
    else { return false }
  }

  return (
    <div className='show-episodes-container'>
      {props.detailedShow.seasons.map((season, seasonIndex) => {
        return (
          <div className={`season-container season-${seasonIndex + 1}`} >
            <div className='season-title-container'
              onClick={handleSeasonClick}>
              <h5 className={isAllSeasonWatched(seasonIndex) ? 'season-title watched' : 'season-title'}>
                <IoIosArrowDown className='title-arrow' />
                {`Season ${seasonIndex + 1}`}
              </h5>
              <span
                className='season-complete'
                onClick={() => {
                  handleCompleteSeason(seasonIndex)
                }}>
                <TiTick />
              </span>
            </div>
            <ul className='episodes-container'>
              {
                season.map((episode, episodeIndex) => {
                  return (
                    <li
                      className={props.watchList.filter(show => show.id === props.detailedShow.id)[0].watched.includes(`S${seasonIndex + 1}E${episodeIndex + 1}`) ? `episode ${episodeIndex + 1} watched` : `episode ${episodeIndex + 1}`}
                      id={`S${seasonIndex + 1}E${episodeIndex + 1}`}
                      key={`S${seasonIndex + 1}E${episodeIndex + 1}`}
                      onClick={handleEpisodeClick}
                    >
                      <span className='episode-number'>{episodeIndex + 1}. </span>
                      {episode.name}
                      {
                        props.detailedShow.seasons[seasonIndex][episodeIndex].summary && <p className='episode-hover'>
                          {props.detailedShow.seasons[seasonIndex][episodeIndex].summary.split('>')[1].split('<')[0]}
                        </p>
                      }
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