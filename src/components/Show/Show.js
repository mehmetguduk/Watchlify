import React from 'react'
import ShowDetails from './ShowDetails'
import ShowEpisodes from './ShowEpisodes'
import ShowPercent from './ShowPercent'
import './Show.scss'

export default function Show(props) {
  return (
    <div className='show-container'>
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