import { useState } from 'react'
import './App.css'
import MovieList from './components/movielist/MovieList'
import SearchBar from './components/searchbar/SearchBar'
import SortBar from './components/sortbar/SortBar'


const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState('nowPlaying')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedSort, setSelectedSort] = useState(popularity_desc);
  const [genres, setGenres] = useState([])

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleViewChange = (newView) => {
    setView(newView);
    setSearchTerm('');
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div className={`App ${isModalOpen ? 'blur-background' : ''}`}>
      <header>
        <h1 className='app-title'>Flixster</h1>

        <div className='nav-container'>
          <button onClick={() => handleViewChange('nowPlaying')}>Now Playing</button>
          <button onClick={() => handleViewChange('search')}>Search</button>
          {view === 'search' && <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch} />}
          <SortBar />
        </div>
      </header>

      <main>
        <MovieList searchTerm={searchTerm} view={view} onOpenModal={handleOpenModal} onClose={handleCloseModal} />
      </main>

      <footer>

      </footer>

    </div>
  )
}

export default App
