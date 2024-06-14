import {useState, useEffect } from 'react';
import './moviecard.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as solidHeart, faCheckCircle as solidCheckCircle, faPlus } from '@fortawesome/fontawesome-free-solid';
import { faHeart as regularHeart, faCircle as regularCheckCircle } from '@fortawesome/fontawesome-free-regular';
import StarRating from '../starrating/StarRating';

const MovieCard = (props) => {
    const {title, poster_path, vote_average, release_date, id} = props.movie;
    const onClick = props.onClick;
    const onLike = props.onLike;
    const onWatched = props.onWatched;

    const [isLiked, setIsLiked] = useState(false);
    const [isWatched, setIsWatched] = useState(false);

    const toggleLike = (event) => {
        event.stopPropagation();
        setIsLiked(!isLiked);
        if (!isLiked) {
            onLike(props.movie);
            alert('Added to your likes!');
        }
    }

    const toggleWatched = (event) => {
        event.stopPropagation();
        setIsWatched(!isWatched);
        if (!isWatched) {
            onWatched(props.movie);
            alert('Added to your watchlist!');
        }
    }

    const posterImage = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : '/src/assets/film.jpeg';
    const imgClass = poster_path ? 'card-img' : 'dummy-img';
    const releaseYear = release_date ? new Date(release_date).getFullYear() : '';

    return (
        <div className="card" onClick={() => onClick(props.movie)}>
            <div>
                <img src={posterImage} alt="Movie Poster" className={imgClass} />
            </div>

            <div className='card-text'>
                <div className='card-head'>
                    <div className='card-title'>
                        <h3>{title} ({releaseYear})</h3>
                    </div>
                    <div className='watched-checkbox'>
                        <FontAwesomeIcon
                            icon={isWatched ? solidCheckCircle : faPlus}
                            onClick={toggleWatched}
                        />
                    </div>
                </div>

                <div className='card-footer'>
                    <div className='rating-section'>
                        <div><StarRating rating={vote_average} /></div>
                        <div>{vote_average}</div>
                    </div>
                    <div>
                        <FontAwesomeIcon
                        icon={isLiked ? solidHeart : regularHeart}
                        onClick={toggleLike}
                        className={`heart-icon ${isLiked ? 'liked' : ''}`} />
                    </div>
                </div>
            </div>
        </div>
    )
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        poster_path: PropTypes.string,
        vote_average: PropTypes.number,
        release_date: PropTypes.string,
        id: PropTypes.number.isRequired
    }).isRequired,
    onClick: PropTypes.func.isRequired,
    onLike: PropTypes.func.isRequired,
    onWatched: PropTypes.func.isRequired
};

export default MovieCard;
