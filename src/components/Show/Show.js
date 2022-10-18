import React from 'react'
import ShowDetails from './ShowDetails'
import ShowEpisodes from './ShowEpisodes'
import setList from "../../utils/database/setList"

export default function Show(props) {

  function handleShowClose() {
    props.setDetailedShow(false)
  }

  function handleShowDelete() {
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