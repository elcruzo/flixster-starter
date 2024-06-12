import './moviecard.css';
import PropTypes from 'prop-types';

const MovieCard = (props) => {
    const {title, poster_path, vote_average} = props.movie;
    const onClick = props.onClick;

    function setMovie() {
        onClick(props.movie);
    }

    return (
        <div className="card" onClick={setMovie}>
            <div>
                <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="Movie Poster" className='card-img' />
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
    })
    .isRequired, onClick: PropTypes.func.isRequired
};

export default MovieCard;
