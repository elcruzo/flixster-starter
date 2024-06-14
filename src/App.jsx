import { useState, useEffect } from 'react'
import './App.css'
import MovieList from './components/movielist/MovieList'
import SearchBar from './components/searchbar/SearchBar'
import SortBar from './components/sortbar/SortBar'
import Hamburger from 'hamburger-react';
import Modal from './components/modal/Modal';
import SidebarMovieItem from './components/sidebarmovie/SideBarMovieItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import imgLogo from './assets/movie_logo.svg';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState('nowPlaying')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedSort, setSelectedSort] = useState('popularity_desc');
  const [genres, setGenres] = useState([])
  const [likedMovies, setLikedMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([])
  const [isSidebarOpen, setIsSideBarOpen] = useState(false);
  const [isWatchedSideBarOpen, setIsWatchedSideBarOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);


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
    setSelectedMovie(null);
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

  const closeSideBar = () => {
    setIsSideBarOpen(false);
  }

  const handleLike = (movie) => {
    setLikedMovies((prevLikedMovies) => [...prevLikedMovies, movie]);
  }

  const handleWatched = (movie) => {
    setWatchedMovies((prevWatchedMovies) => [...prevWatchedMovies, movie])
  }

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    handleOpenModal();
  }

  return (
    <div className={`App ${isModalOpen ? 'blur-background' : ''}`}>
      <header>
        <div className='logo-section'>
          <div>
            <h1 className='app-title'>Flixster</h1>
          </div>
          <div>
            <p className='greeting-text'>Hello, Caleb <FontAwesomeIcon icon="fa-solid fa-user" className='user-icon' /></p>
          </div>
        </div>

        <div>
          <div className='nav-container'>
            <button>Home</button>
            <button>Genres</button>
            <button onClick={() => handleViewChange('nowPlaying')}>Now Playing</button>
            <button>Coming Soon</button>
          </div>

          <div className='search-icon-container'>
            <div>
              {view === 'search' && <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch} />}
            </div>
            <div>
              <button onClick={() => handleViewChange('search')} className='search-button'><FontAwesomeIcon icon="fas fa-search" /></button>
            </div>
          </div>
        </div>
      </header>

      <main className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}>
        <div>
          <div className='sorting-options'>
            {isSidebarOpen ? null : <Hamburger toggled={isSidebarOpen} toggle={toggleSideBar} size={20} />}
            <SortBar
              genres={genres}
              selectedGenre={selectedGenre}
              setSelectedGenre={setSelectedGenre}
              selectedSort={selectedSort}
              setSelectedSort={setSelectedSort}
            />
          </div>
        </div>
        <MovieList
          searchTerm={searchTerm}
          view={view}
          onOpenModal={handleOpenModal}
          onClose={handleCloseModal}
          selectedSort={selectedSort}
          selectedGenre={selectedGenre}
          handleLike={handleLike}
          handleWatched={handleWatched}
          handleMovieClick={handleMovieClick}
        />

        {selectedMovie && (
          <Modal
            movie={selectedMovie}
            onClose={handleCloseModal}
            isSidebarOpen={isSidebarOpen}
            />
        )}

        {isSidebarOpen && (
          <div className={`sidebar-right ${isSidebarOpen} ? 'open' : ''}`}>
            <button className='close-button' onClick={closeSideBar}>&times;</button>
            <h3>Liked Movies</h3>
            {likedMovies.map((movie) => (
              <SidebarMovieItem
                key={movie.id}
                movie={movie}
              />
            ))}
            <hr />
            <h3>Watched Movies</h3>
            {watchedMovies.map((movie) => (
              <SidebarMovieItem
                key={movie.id}
                movie={movie}
              />
            ))}
          </div>
        )}
      </main>

      <footer>

        {isSidebarOpen && <div className='overlay' onClick={toggleSideBar}></div>}
      </footer>

    </div>
  )
}

export default App
