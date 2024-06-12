import './modal.css'
import PropTypes from 'prop-types';

const Modal = ({ movie, onClose}) => {
    if (!movie) return null;

    const {backdrop_path, runtime, release_date, genres, overview, title} = movie;

    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <button className='close-button' onClick={onClose}>&times;</button>
                <img src={`https://image.tmdb.org/t/p/w500${backdrop_path}`} alt="Backdrop" className='modal-backdrop' />
                <h2>{title}</h2>
                <p><strong>Runtime:</strong>  {runtime} </p>
                <p><strong>Release Date:</strong>  {release_date} </p>
                <p><strong>Genres:</strong>  {genres.join(', ')} </p>
                <p><strong>Overview:</strong>  {overview} </p>
            </div>
        </div>
    )
}

Modal.propTypes = {
    movie: PropTypes.shape({
        backdrop_path: PropTypes.string,
        runtime: PropTypes.number,
        release_date: PropTypes.string,
        genres: PropTypes.arrayOf(PropTypes.string),
        overview: PropTypes.string,
        title: PropTypes.string.isRequired
    }),
        onClose: PropTypes.func.isRequired
};

export default Modal;
