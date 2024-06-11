import {useState, useEffect} from "react";
import MovieCard from '../moviecard/MovieCard';

import './movielist.css';

async function searchMovies (searchTerm, apiKey) {
    fetch('https://api.themoviedb.org/3/search/movie?query='+ searchTerm +'&api_key=' + apiKey)
        .then(response => response.json())
        .then(data => {
            return data;
        })
}

async function getNowPlayingMovies (apiKey, page) {
    try {
        const response = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page='+page+'&sort_by=popularity.desc'+'&api_key=' + apiKey);
        const data = await response.json();
        console.log('API Data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        return { results: []};
    }
}

export default function MovieList(props) {

    const API_KEY = import.meta.env.VITE_API_KEY
    let searchTerm = props.searchTerm

    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        loadMovies();
    }, []);

    const loadMovies = async () => {
        const data = await getNowPlayingMovies(API_KEY, page);
        setMovies(prevMovies => [...prevMovies, ...data.results]);
        console.log('Movies State:', movies);
    }

    const handleLoadMore = async () => {
        setPage(prevPage => prevPage + 1);
        const data = await getNowPlayingMovies(API_KEY, page + 1)
        setMovies(prevMovies => [...prevMovies, ...data.results]);
        };

    return(
        <div className="movielist">
            {
                movies.map(movie => {
                    return <MovieCard movie={movie} key={movie.id} />
                })
            }
            <div className='loadmore-button'>
                <button onClick={handleLoadMore}>Load More</button>
            </div>
        </div>
    )
}
