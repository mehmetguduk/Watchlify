import React from 'react'

export default function ShowDetails(props) {
  return (
    <div className='show-details-container'>

      <div className='image-container'>
        <img className='detail-image' src={props.detailedShow.image ? props.detailedShow.image.medium : 'https://via.placeholder.com/210x295'} alt='Show Cover' />
        {
          props.detailedShow.status ?
            <div className={`detail-status ${props.detailedShow.status.toLowerCase()}`}>
              <p className='status-hover'>
                <span className='hover-text'>
                  {props.detailedShow.status}
                </span>
              </p>
            </div>
            :
            <div className="detail-status unknown">
              <p className='status-hover'>
                <span className='hover-text'>
                  Unknown
                </span>
              </p>
            </div>
        }
      </div>

      <div className='details-container'>
        <p>Id : {props.detailedShow.id ? props.detailedShow.id : 'Unknown'}</p>

        <p>Name : {props.detailedShow.name ? props.detailedShow.name : 'Unknown'}</p>

        <p>Network : {props.detailedShow.network !== null || props.detailedShow.webChannel !== null ? props.detailedShow.network ? props.detailedShow.network.name : props.detailedShow.webChannel.name : 'Unknown'}</p>

        <p>Year : {props.detailedShow.premiered ? props.detailedShow.premiered.split("-")[0] : 'Unknown'}</p>

        <p>Genres : {props.detailedShow.genres ? props.detailedShow.genres.map((genre, index) => {
          return (`${genre}${props.detailedShow.genres.length - 1 !== index ? ", " : ""}`)
        }) : 'Unknown'}</p>

        <p>Average Runtime : {props.detailedShow.averageRuntime ? props.detailedShow.averageRuntime : 'Unknown'} mins</p>

        <p>Watched {props.watchList.filter(show => show.id === props.detailedShow.id)[0].watched !== undefined && props.detailedShow.episodeCount !== undefined ? `${props.watchList.filter(show => show.id === props.detailedShow.id)[0].watched.length} of ${props.detailedShow.episodeCount} episode${props.detailedShow.episodeCount > 1 && 's'}` : 'Unknown'}</p>

        <div className='progress-bar-container'>
          {
            props.watchList.filter(show => show.id === props.detailedShow.id)[0].watched !== undefined && props.detailedShow.episodeCount !== undefined &&
            <div className='progress' style={{ width: `${Math.round((100 * props.watchList.filter(show => show.id === props.detailedShow.id)[0].watched.length) / props.detailedShow.episodeCount)}%` }}>
              <span className='progress-percent'>{`${Math.round((100 * props.watchList.filter(show => show.id === props.detailedShow.id)[0].watched.length) / props.detailedShow.episodeCount)}%`}</span>
            </div>
          }
        </div>
      </div>

    </div>
  )
}