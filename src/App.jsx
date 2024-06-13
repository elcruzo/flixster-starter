import { useState, useEffect } from 'react'
import './App.css'
import MovieList from './components/movielist/MovieList'
import SearchBar from './components/searchbar/SearchBar'
import SortBar from './components/sortbar/SortBar'
import MovieCard from './components/moviecard/MovieCard'
import Hamburger from 'hamburger-react';
import Modal from './components/modal/Modal';
import SidebarMovieItem from './components/sidebarmovie/SideBarMovieItem'


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
  const [selectedMovie, setSelectedMovie] = useState(null)

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

  const toggleWatchedSidebar = () => {
    setIsWatchedSideBarOpen(!isWatchedSideBarOpen);
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
            <Hamburger toggled={isSidebarOpen} toggle={toggleSideBar} size={20} />
            <Hamburger toggled={isWatchedSideBarOpen} toggle={toggleWatchedSidebar} size={20} />
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
          <div className='sidebar-right'>
            <h2>Liked Movies</h2>
            {likedMovies.map((movie) => (
              <SidebarMovieItem
                key={movie.id}
                movie={movie}
                // onClick={() => { }}
              />
            ))}
          </div>
        )}

        {isWatchedSideBarOpen && (
          <div className='sidebar-left'>
            <h2>Watched Movies</h2>
            {watchedMovies.map((movie) => (
              <SidebarMovieItem
                key={movie.id}
                movie={movie}
                // onClick={() => { }}
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
