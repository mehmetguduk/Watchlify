import React from 'react'
import './ShowDetails.scss'
import setList from '../../utils/database/setList';
import { HiExternalLink } from "react-icons/hi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import placeholder from '../../images/placeholder.jpg'

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
        <img className='detail-image' src={props.detailedShow.image ? props.detailedShow.image.medium : placeholder} alt='Show Cover' />
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
          <p className='show-network'>{props.detailedShow.network !== null || props.detailedShow.webChannel !== null ? props.detailedShow.network ? props.detailedShow.network.name : props.detailedShow.webChannel.name : 'Unknown'}
            <span className='show-year'>{props.detailedShow.premiered ? `(${props.detailedShow.premiered.split("-")[0]})` : '(Unknown)'}</span>
          </p>
        </div>

        <div className='detail-container-3'>
          <p className='show-genres'>{props.detailedShow.genres ? props.detailedShow.genres.map((genre, index) => {
            return (`${genre}${props.detailedShow.genres.length - 1 !== index ? ", " : ""}`)
          }) : 'Unknown'}</p>

          <p className='show-average-runtime'>{props.detailedShow.averageRuntime ? `${props.detailedShow.averageRuntime} mins` : 'Unknown'}</p>
          <span
            className='show-delete'
            onClick={handleShowDelete}>
            <RiDeleteBin5Fill />
          </span>
        </div>

      </div>

    </div>
  )
}