import React from "react"
import Show from "./Show/Show";
import './MyShows.scss'

export default function MyShows(props) {

  function handleShowClick(event) {
    let show = props.watchList.filter(show => {
      return show.id === Number(event.target.closest('li.show').id)
    })[0]
    if (show !== undefined) { props.setDetailedShow(show) }
    else { props.setDetailedShow(false) }
  }

  return (
    <div className="myshows-container">
      {
        props.detailedShow === false ?
          <ul className="shows-container">
            {props.watchList.map(show => {
              let showId = show.id ? show.id : 'Unknown';
              let showName = show.name ? show.name : 'Unknown';
              let showImage = show.image ? show.image.medium : 'https://via.placeholder.com/210x295';
              return (
                <li
                  className="show"
                  id={showId}
                  onClick={handleShowClick}
                >
                  <img className="show-image" src={showImage} alt='Show Cover' />
                  <h5 className="show-name">{showName}</h5>
                </li>
              )
            })}
          </ul>
          :
          <Show
            watchList={props.watchList}
            setWatchList={props.setWatchList}
            detailedShow={props.detailedShow}
            setDetailedShow={props.setDetailedShow}
          />
      }
    </div>
  )
}