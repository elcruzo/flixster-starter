import { useState } from 'react'
import './App.css'
import MovieList from './components/MovieList'
import SearchBox from './components/SearchBox'
const App = () => {
  return (
    <div className="App">
      <header>
        <h1 className='app-title'>Flixster</h1>

        <div className='nav-container'>
          <SearchBox />
        </div>
      </header>

      <main>
        <MovieList />
        <div className='loadmore-button'>
          <button>Load More</button>
        </div>
      </main>

      <footer>

      </footer>

    </div>
  )
}

export default App
