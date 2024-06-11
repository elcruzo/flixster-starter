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
    return fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page='+page+'&sort_by=popularity.desc'+'&api_key=' + apiKey)
        .then(response => response.json())
        .then(data => {
            return data;
        })
}

const MovieList = (props) => {

    const API_KEY = import.meta.env.VITE_API_KEY
    let searchTerm = props.searchTerm

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getNowPlayingMovies(API_KEY , 1)
            .then(data => {
                setMovies(data.results)
            })
    }, [])

    return(
        <div className="movielist">
            {
                movies.map(movie => {
                    return <MovieCard movie={movie} key={movie.id} />
                })
            }
        </div>
    )
}

export default MovieList;
