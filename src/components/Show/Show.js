import React from 'react'
import ShowDetails from './ShowDetails'
import ShowEpisodes from './ShowEpisodes'
import ShowPercent from './ShowPercent'
import Confetti from 'react-confetti'
import './Show.scss'

export default function Show(props) {
  return (
    <div className='show-container'>
      {
        Math.round((100 * props.watchList.filter(show => show.id === props.detailedShow.id)[0].watched.length) / props.detailedShow.episodeCount) === 100 ? <Confetti width='350px' height='450px' gravity={0.02} numberOfPieces={80} opacity={0.8} /> : <Confetti width='350px' height='450px' gravity={0.02} numberOfPieces={0} opacity={0.8} />
      }
      <ShowDetails
        watchList={props.watchList}
        setWatchList={props.setWatchList}
        detailedShow={props.detailedShow}
        setDetailedShow={props.setDetailedShow}
      />
      <ShowPercent
        watchList={props.watchList}
        detailedShow={props.detailedShow}
      />
      <ShowEpisodes
        watchList={props.watchList}
        setWatchList={props.setWatchList}
        detailedShow={props.detailedShow}
        setDetailedShow={props.setDetailedShow}
      />
    </div>
  )
}