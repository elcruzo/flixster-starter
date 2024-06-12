import {useState, useEffect} from "react";
import MovieCard from '../moviecard/MovieCard';
import Modal from "../modal/Modal";

import './movielist.css';

async function searchMovies (searchTerm, apiKey, page) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=${apiKey}&page=${page}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error searching movies:', error);
        return { results: []};
    }
}

async function getNowPlayingMovies (apiKey, page) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&api_key=${apiKey}`);
        const data = await response.json();
        console.log('API Data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        return { results: []};
    }
}

function getGenres(genreID) {
    switch (genreID) {
        case 28:
            return 'Action';
        case 12:
            return 'Adventure';
        case 16:
            return 'Animation';
        case 35:
            return 'Comedy';
        case 80:
            return 'Crime';
        case 99:
            return 'Documentary';
        case 18:
            return 'Drama';
        case 10751:
            return 'Family';
        case 14:
            return 'Fantasy';
        case 36:
            return 'History';
        case 27:
            return 'Horror';
        case 10402:
            return 'Music';
        case 9648:
            return 'Mystery';
        case 10749:
            return 'Romance';
        case 878:
            return 'Science Fiction';
        case 10770:
            return 'TV Movie';
        case 53:
            return 'Thriller';
        case 10406:
            return 'War';
        case 37:
            return 'Western';
        default:
            return 'Unknown';
    }
}

export default function MovieList({searchTerm, view}) {

    const API_KEY = import.meta.env.VITE_API_KEY
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [selectedMovie, setSelectedMovie] = useState(null);


    useEffect(() => {
        loadMovies();
    }, [view, searchTerm, page]);

    const loadMovies = async () => {
        const data = searchTerm
            ?   await searchMovies(searchTerm, API_KEY, page)
            :   await getNowPlayingMovies(API_KEY, page);

        const movieWithGenres = data.results.map(movie => ({
            ...movie,
            genres: movie.genre_ids.map(id => getGenres(id))
        }));

        setMovies(prevMovies => page === 1 ? movieWithGenres : [...prevMovies, ...movieWithGenres]);
        console.log('Movies State:', movies);
    }

    const handleLoadMore = async () => {
        setPage(prevPage => prevPage + 1);
        };

    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
    }

    const handleCloseModal = () => {
        setSelectedMovie(null);
    }

    useEffect(() => {
        setPage(1);
    }, [searchTerm, view]);

    return(
        <div>
            <div className="movielist">
                {movies.length > 0 ? (
                    movies.map(movie => (
                        <MovieCard movie={movie} key={movie.id} onClick={handleMovieClick}/>
                    ))
                ) : (
                    <div className="no-results-container">
                        <p className="no-results-message">No movies found. Please try a different search.</p>
                    </div>
                )}
            </div>

            <div className='loadmore-button'>
                <button onClick={handleLoadMore}>Load More</button>
            </div>

            {selectedMovie && <Modal movie={selectedMovie} onClose={handleCloseModal} />}
        </div>

    )
}
