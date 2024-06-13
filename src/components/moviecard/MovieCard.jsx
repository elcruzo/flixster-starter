import {useState, useEffect } from 'react';
import './moviecard.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as solidHeart } from '@fortawesome/fontawesome-free-solid';
import { faHeart as regularHeart } from '@fortawesome/fontawesome-free-regular';

const MovieCard = (props) => {
    const {title, poster_path, vote_average, release_date, id} = props.movie;
    const onClick = props.onClick;
    const onLike = props.onLike;

    const [isLiked, setIsLiked] = useState(false);

    const toggleLike = (event) => {
        event.stopPropagation();
        setIsLiked(!isLiked);
        if (!isLiked) {
            onLike(props.movie);
        }
    }

    function setMovie() {
        onClick(props.movie);
    }

    const posterImage = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : '../../../src/assets/film.jpeg';
    const imgClass = poster_path ? 'card-img' : 'dummy-img';
    const releaseYear = release_date ? new Date(release_date).getFullYear() : '';

    return (
        <div className="card" onClick={setMovie}>
            <div>
                <img src={posterImage} alt="Movie Poster" className={imgClass} />
            </div>
            <div>
                <h2>{title}</h2>
                <div>
                    <p>Rating: {vote_average}</p>
                    <p>{releaseYear}</p>
                    <FontAwesomeIcon
                        icon={isLiked ? solidHeart : regularHeart}
                        onClick={toggleLike}
                        className='heart-icon'
                    />
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
    onLike: PropTypes.func.isRequired
};

export default MovieCard;
