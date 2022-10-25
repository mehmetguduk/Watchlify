import React from 'react'
import setList from "../../utils/database/setList"
import './ShowEpisodes.scss'
import { TiTick } from "react-icons/ti";
import { IoIosArrowDown } from "react-icons/io";
import { BsFillInfoCircleFill } from "react-icons/bs";
import placeholderEpisode from '../../images/placeholderEpisode.jpg'
import Confetti from 'react-confetti'

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
    if (event.target.nodeName !== 'svg' && event.target.nodeName !== 'path') {
      event.target.closest('div.season-title-container').classList.toggle("active")
    }
    else if (event.target.closest('svg.title-arrow') !== null) {
      event.target.closest('div.season-title-container').classList.toggle("active")
    }
  }

  function handleEpisodeClick(event) {
    if (event.target.closest('div.episode-hover') === null) {
      let targetId = event.target.closest('li.episode').id
      let showRelated = props.watchList.filter(show => show.id === props.detailedShow.id)[0]
      let isEpisodeExists = showRelated.watched.includes(targetId)

      if (isEpisodeExists) {
        const newWatchList = props.watchList.map(show => {
          if (show === showRelated) {
            const updatedShow = {
              ...show,
              watched: show.watched.filter(episode => episode !== targetId)
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
              watched: [...show.watched, targetId]
            }
            return updatedShow
          }
          return show
        })
        setList(newWatchList)
        props.setWatchList(newWatchList)
      }
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

            {
              Math.round((100 * props.watchList.filter(show => show.id === props.detailedShow.id)[0].watched.length) / props.detailedShow.episodeCount) === 100 ? <Confetti width='350px' height='450px' gravity={0.02} numberOfPieces={80} opacity={0.8} /> : <Confetti width='350px' height='450px' gravity={0.02} numberOfPieces={0} opacity={0.8} />
            }

            <div className='season-title-container'
              onClick={handleSeasonClick}>
              <h5 className={isAllSeasonWatched(seasonIndex) ? 'season-title watched' : 'season-title'}>
                <IoIosArrowDown className='title-arrow' />
                <span className='title'>{`Season ${seasonIndex + 1}`}</span>
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

                      <div className='episode-title-container'>
                        <div className='title-container'>
                          <span className='episode-number'>
                            {episodeIndex + 1}.
                          </span>
                          <span className='episode-title'>
                            {episode.name}
                          </span>
                        </div>
                        {
                          props.detailedShow.seasons[seasonIndex][episodeIndex].summary &&
                          <div className='episode-hover'>
                            <span className='hover-info-icon'>
                              <BsFillInfoCircleFill />
                            </span>
                            <div className='hover-content-container'>
                              <img className='hover-image' src={props.detailedShow.seasons[seasonIndex][episodeIndex].image ? props.detailedShow.seasons[seasonIndex][episodeIndex].image.medium : placeholderEpisode} alt='Episode Cover' />

                              <div className='hover-title-container'>
                                <h5 className='title'>
                                  {`📼 S${seasonIndex + 1} E${episodeIndex + 1}`}
                                </h5>
                                <span className='date'>{
                                  ` 
                              (${props.detailedShow.seasons[seasonIndex][episodeIndex].airdate && props.detailedShow.seasons[seasonIndex][episodeIndex].airdate.split('-')[2]}

                              ${props.detailedShow.seasons[seasonIndex][episodeIndex].airdate && ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                                  ][Number(props.detailedShow.seasons[seasonIndex][episodeIndex].airdate.split('-')[1]) - 1]}
                              
                              ${props.detailedShow.seasons[seasonIndex][episodeIndex].airdate && props.detailedShow.seasons[seasonIndex][episodeIndex].airdate.split('-')[0]}

                              ${props.detailedShow.seasons[seasonIndex][episodeIndex].airtime && props.detailedShow.seasons[seasonIndex][episodeIndex].airtime})
                              `
                                }
                                </span>
                              </div>
                              <p className='hover-description'>
                                {props.detailedShow.seasons[seasonIndex][episodeIndex].summary.replaceAll('<br />', ' ').replaceAll(/<.*?>/g, '')}
                              </p>
                            </div>
                          </div>
                        }
                      </div>

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