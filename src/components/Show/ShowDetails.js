import React from 'react'

export default function ShowDetails(props) {
  return (
    <div className='show-details-container'>
      <img src={props.detailedShow.image ? props.detailedShow.image.medium : 'https://via.placeholder.com/210x295'} alt='Show Cover' />

      <p>Id : {props.detailedShow.id ? props.detailedShow.id : 'Unknown'}</p>

      <p>Name : {props.detailedShow.name ? props.detailedShow.name : 'Unknown'}</p>

      <p>Status : {props.detailedShow.status ? props.detailedShow.status : 'Unknown'}</p>

      <p>Network : {props.detailedShow.network !== null || props.detailedShow.webChannel !== null ? props.detailedShow.network ? props.detailedShow.network.name : props.detailedShow.webChannel.name : 'Unknown'}</p>

      <p>Year : {props.detailedShow.premiered ? props.detailedShow.premiered.split("-")[0] : 'Unknown'}</p>

      <p>Genres : {props.detailedShow.genres ? props.detailedShow.genres.map((genre, index) => {
        return (`${genre}${props.detailedShow.genres.length - 1 !== index ? ", " : ""}`)
      }) : 'Unknown'}</p>

      <p>Average Runtime : {props.detailedShow.averageRuntime ? props.detailedShow.averageRuntime : 'Unknown'} mins</p>

      <p>Watched {props.detailedShow.watched !== undefined && props.detailedShow.episodeCount !== undefined ? `${props.detailedShow.watched.length} of ${props.detailedShow.episodeCount} episode${props.detailedShow.episodeCount > 1 && 's'}` : 'Unknown'}</p>

      <p>Watched : {props.detailedShow.watched !== undefined && props.detailedShow.episodeCount !== undefined ? `${Math.round((100 * props.detailedShow.watched.length) / props.detailedShow.episodeCount)}%` : 'Unknown'}</p>
    </div>
  )
}