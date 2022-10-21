import React from 'react'
import ShowDetails from './ShowDetails'
import ShowEpisodes from './ShowEpisodes'
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
      <ShowEpisodes
        watchList={props.watchList}
        setWatchList={props.setWatchList}
        detailedShow={props.detailedShow}
        setDetailedShow={props.setDetailedShow}
      />
    </div>
  )
}