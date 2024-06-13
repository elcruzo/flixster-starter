import './modal.css'
import PropTypes from 'prop-types';

const Modal = ({ movie, onClose}) => {
    if (!movie) return null;

    const {backdrop_path, vote_average, runtime, release_date, genres, overview, title} = movie;

    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <button className='close-button' onClick={onClose}>&times;</button>
                <img src={`https://image.tmdb.org/t/p/w500${backdrop_path}`} alt="Backdrop" className='modal-backdrop' />
                <h2>{title}</h2>
                <p><strong>Rating:</strong> {vote_average}</p>
                <p><strong>Runtime:</strong>  {runtime} </p>
                <p><strong>Release Date:</strong>  {release_date} </p>
                <p><strong>Genres:</strong>  {Array.isArray(genres) ? genres.map(genre => genre.name).join(', ') : 'N/A'} </p>
                <p><strong>Overview:</strong>  {overview} </p>
            </div>
        </div>
    )
}

Modal.propTypes = {
    movie: PropTypes.shape({
        backdrop_path: PropTypes.string,
        vote_average: PropTypes.number,
        runtime: PropTypes.number,
        release_date: PropTypes.string,
        genres: PropTypes.arrayOf(PropTypes.shape ({
            name: PropTypes.string.isRequired
        })),
        overview: PropTypes.string,
        title: PropTypes.string.isRequired,
    }),
        onClose: PropTypes.func.isRequired
};

export default Modal;
