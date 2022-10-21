import React from 'react'
import './ShowDetails.scss'
import setList from '../../utils/database/setList';
import { HiExternalLink } from "react-icons/hi";
import { RiDeleteBin5Fill } from "react-icons/ri";

export default function ShowDetails(props) {
  function handleShowDelete(event) {
    event.preventDefault()
    props.setDetailedShow(false)
    props.setWatchList(prevWatchList => {
      let newWatchList = prevWatchList.filter(show => show.id !== props.detailedShow.id)
      setList(newWatchList)
      return newWatchList
    })
  }

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

        <div className='detail-container-1'>
          <h5 className='show-name'>{props.detailedShow.name ? props.detailedShow.name : 'Unknown'}</h5>
          <a className='show-imdb' href={props.detailedShow.externals.imdb && `https://www.imdb.com/title/${props.detailedShow.externals.imdb}`} target='_blank' rel="noreferrer"><HiExternalLink /></a>
        </div>

        <div className='detail-container-2'>
          <p className='show-network'>{props.detailedShow.network !== null || props.detailedShow.webChannel !== null ? props.detailedShow.network ? props.detailedShow.network.name : props.detailedShow.webChannel.name : 'Unknown'}</p>

          <p className='show-year'>{props.detailedShow.premiered ? `(${props.detailedShow.premiered.split("-")[0]})` : 'Unknown'}</p>
        </div>

        <div className='detail-container-3'>
          <p className='show-genres'>{props.detailedShow.genres ? props.detailedShow.genres.map((genre, index) => {
            return (`${genre}${props.detailedShow.genres.length - 1 !== index ? ", " : ""}`)
          }) : 'Unknown'}</p>

          <p className='show-average-runtime'>{props.detailedShow.averageRuntime ? props.detailedShow.averageRuntime : 'Unknown'} mins</p>
          <span
            className='show-delete'
            onClick={handleShowDelete}>
            <RiDeleteBin5Fill />
          </span>
        </div>

        <div className='detail-container-4'>
          <p className='show-watched'>Watched {props.watchList.filter(show => show.id === props.detailedShow.id)[0].watched !== undefined && props.detailedShow.episodeCount !== undefined ? `${props.watchList.filter(show => show.id === props.detailedShow.id)[0].watched.length} of ${props.detailedShow.episodeCount} episode${props.detailedShow.episodeCount > 1 && 's'}` : 'Unknown'}</p>
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

    </div>
  )
}