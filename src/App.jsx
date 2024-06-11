import { useState } from 'react'
import './App.css'
import MovieList from './components/movielist/MovieList'
import SearchBar from './components/searchbar/SearchBar'
import SortBar from './components/sortbar/SortBar'
const App = () => {
  return (
    <div className="App">
      <header>
        <h1 className='app-title'>Flixster</h1>

        <div className='nav-container'>
          <SearchBar />
          <SortBar />
        </div>
      </header>

      <main>
        <MovieList />
      </main>

      <footer>

      </footer>

    </div>
  )
}

export default App
