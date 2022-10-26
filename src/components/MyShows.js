import React from "react"
import Show from "./Show/Show";
import './MyShows.scss'
import placeholder from "../images/placeholder.jpg"
import watchlifyTransparent from "../images/watchlifyTransparent.png"

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
        props.watchList.length === 0 ?
          <div className="no-show-container">
            <img className="no-show-logo" src={watchlifyTransparent} alt='Watchlify Logo' />
            <h5 className="no-show-text">There are no shows in your watch list</h5>
          </div> : <></>
      }
      {
        props.detailedShow === false ?
          <ul className="shows-container">
            {props.watchList.map(show => {
              let showId = show.id ? show.id : 'Unknown';
              let showName = show.name ? show.name : 'Unknown';
              let showImage = show.image ? show.image.medium : placeholder;
              return (
                <li
                  className={Math.round((100 * show.watched.length) / show.episodeCount) === 100 ? 'show watched' : 'show'}
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