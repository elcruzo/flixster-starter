import './moviecard.css';
import PropTypes from 'prop-types';

const MovieCard = (props) => {
    const {title, poster_path, vote_average} = props.movie;
    const onClick = props.onClick;

    function setMovie() {
        onClick(props.movie);
    }

    const posterImage = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : '../../../src/assets/film.jpeg';
    const imgClass = poster_path ? 'card-img' : 'dummy-img'
    return (
        <div className="card" onClick={setMovie}>
            <div>
                <img src={posterImage} alt="Movie Poster" className={imgClass} />
            </div>
            <div>
                <h2>{title}</h2>
                <div>
                    <p>Rating: {vote_average}</p>
                </div>
            </div>
        </div>
    )
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        poster_path: PropTypes.string,
        vote_average: PropTypes.number
    }).isRequired,
    onClick: PropTypes.func.isRequired
};

export default MovieCard;
