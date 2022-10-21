import React from 'react'
import ShowDetails from './ShowDetails'
import ShowEpisodes from './ShowEpisodes'
import setList from "../../utils/database/setList"
import './Show.scss'

export default function Show(props) {

  function handleShowClose(event) {
    props.setDetailedShow(false)
    event.preventDefault()
  }

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
    <div className='show-container'>
      <button
        className='show-close'
        onClick={handleShowClose}>
        Close
      </button>

      <button
        className='show-delete'
        onClick={handleShowDelete}>
        Delete
      </button>

      <ShowDetails
        watchList={props.watchList}
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