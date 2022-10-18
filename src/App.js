import React from 'react'
import Tabs from './components/Tabs';
import MyShows from './components/MyShows';
import Search from './components/Search/Search';
import getList from './utils/database/getList'
import './style.scss'

function App() {
  const [watchList, setWatchList] = React.useState(getList())
  const [currentTab, setCurrentTab] = React.useState('Search')
  const [detailedShow, setDetailedShow] = React.useState(false)

  return (
    <div className="App">
      <Tabs
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        detailedShow={detailedShow}
        setDetailedShow={setDetailedShow}
      />

      {currentTab === 'Search' &&
        <Search
          watchList={watchList}
          setWatchList={setWatchList}
        />
      }

      {currentTab === 'My Shows' &&
        <MyShows
          watchList={watchList}
          setWatchList={setWatchList}
          detailedShow={detailedShow}
          setDetailedShow={setDetailedShow}
        />
      }
    </div>
  );
}

export default App;
