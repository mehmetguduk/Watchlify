/*
  THIS FILE WAS DEVELOPED BY MEHMET GUDUK
  © 2022 COPYRIGHT, LICENSED WITH GPL-3.0 LICENSE, AUTHOR IS MEHMET GUDUK
  https://github.com/mehmetguduk
*/

import React from 'react';
import './Tabs.scss'

export default function Tabs(props) {

  function handleTabClick(event) {
    if (event.target.textContent !== props.currentTab) {
      props.setCurrentTab(event.target.textContent);
      props.setDetailedShow(false)
    }
    else if (event.target.textContent === 'My Shows') {
      props.setDetailedShow(false)
    }
    else { return }
  }

  return (
    <div className="tabs-container">
      <ul className="tab-list">
        <li
          className={props.currentTab === 'My Shows' ? 'tab active' : 'tab'}
          onClick={handleTabClick}>My Shows</li>
        <li
          className={props.currentTab === 'Search' ? 'tab active' : 'tab'}
          onClick={handleTabClick}>Search</li>
      </ul>
    </div>
  )
}