import React from 'react';
import './ShowPercent.scss'

export default function ShowPercent(props) {
  return (
    <div className='show-percent-container'>

      <div className='progress-bar-container'>
        {
          props.watchList.filter(show => show.id === props.detailedShow.id)[0].watched !== undefined && props.detailedShow.episodeCount !== undefined &&
          <div className='progress' style={{ width: `${Math.round((100 * props.watchList.filter(show => show.id === props.detailedShow.id)[0].watched.length) / props.detailedShow.episodeCount)}%` }}>
            <span className='progress-percent'>
              Watched {props.watchList.filter(show => show.id === props.detailedShow.id)[0].watched !== undefined && props.detailedShow.episodeCount !== undefined ? `${props.watchList.filter(show => show.id === props.detailedShow.id)[0].watched.length} of ${props.detailedShow.episodeCount} episode${props.detailedShow.episodeCount > 1 ? 's' : ''}` : 'Unknown'} ({`${Math.round((100 * props.watchList.filter(show => show.id === props.detailedShow.id)[0].watched.length) / props.detailedShow.episodeCount)}%`})
            </span>
          </div>
        }
      </div>
    </div>
  )
}