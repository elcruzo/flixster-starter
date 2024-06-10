import { useState } from 'react'
import './App.css'
import MovieList from './components/MovieList'

const App = () => {
  return (
    <div className="App">
      <header>
        <h1 className='app-title'>Flixster</h1>

        <div className='nav-container'>
          <div>
            <input type="text" />
            <button type='submit' value="Submit">Search</button>
          </div>

          <div>
            <select name="sort-by" id="">
              <option value="name">Sort by Name</option>
              <option value="likes">Sort by Likes</option>
              <option value="date">Sort by Date Added</option>
            </select>
          </div>
        </div>
      </header>

      <main>
        <MovieList />
        <button>Load More</button>

      </main>

      <footer>

      </footer>

    </div>
  )
}

export default App
