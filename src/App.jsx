import { useState, useEffect } from 'react'
import './App.css'
import MovieList from './components/movielist/MovieList'
import SearchBar from './components/searchbar/SearchBar'
import SortBar from './components/sortbar/SortBar'
import MovieCard from './components/moviecard/MovieCard'
import Hamburger from 'hamburger-react';


const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState('nowPlaying')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedSort, setSelectedSort] = useState('popularity_desc');
  const [genres, setGenres] = useState([])
  const [likedMovies, setLikedMovies] = useState([]);
  const [isSidebarOpen, setIsSideBarOpen] = useState(false);

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

  useEffect(() => {
    const fetchGenres = async () => {
      try{
        const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`);
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error('Error fetching genres: ', error);
      }
    };
    fetchGenres();
  }, []);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSidebarOpen);
  }

  const handleLike = (movie) => {
    setLikedMovies((prevLikedMovies) => [...prevLikedMovies, movie]);
  }

  return (
    <div className={`App ${isModalOpen ? 'blur-background' : ''}`}>
      <header>
        <h1 className='app-title'>Flixster</h1>

        <div className='nav-container'>
          <button onClick={() => handleViewChange('nowPlaying')}>Now Playing</button>
          <button onClick={() => handleViewChange('search')}>Search</button>
          {view === 'search' && <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch} />}
          <SortBar
            genres={genres}
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
            />
            <button className='hamburger-button' onClick={toggleSideBar}><Hamburger onToggle={toggled => ...} /></button>
        </div>
      </header>

      <main>
        <MovieList
          searchTerm={searchTerm}
          view={view}
          onOpenModal={handleOpenModal}
          onClose={handleCloseModal}
          selectedSort={selectedSort}
          selectedGenre={selectedGenre}
          handleLike={handleLike}/>
        {isSidebarOpen && (
          <div className='sidebar'>
            <h2>Liked Movies</h2>
            {likedMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={() => { }}
              />
            ))}
          </div>
        )}
      </main>

      <footer>

      </footer>

    </div>
  )
}

export default App
