import {useState, useEffect} from "react";
import MovieCard from '../moviecard/MovieCard';

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

export default function MovieList({searchTerm}) {

    const API_KEY = import.meta.env.VITE_API_KEY
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(Math.floor(Math.random() * 20));

    useEffect(() => {
        loadMovies();
    }, [searchTerm, page]);

    const loadMovies = async () => {
        const data = searchTerm
            ?   await searchMovies(searchTerm, API_KEY, page)
            :   await getNowPlayingMovies(API_KEY, page);
            setMovies(page === 1 ? data.results : [...movies, ...data.results]);
        console.log('Movies State:', movies);
    }

    const handleLoadMore = async () => {
        setPage(prevPage => prevPage + 1);
        };

    return(
        <div>
            <div className="movielist">
                {
                    movies.map(movie => {
                        <MovieCard movie={movie} key={movie.id} />
                    })
                }

            </div>

            <div className='loadmore-button'>
                <button onClick={handleLoadMore}>Load More</button>
            </div>
        </div>

    )
}
