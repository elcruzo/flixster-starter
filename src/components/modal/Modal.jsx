import './modal.css'

const Modal = ({ movie, onClose}) => {
    if (!movie) return null;

    const {backdrop_path, runtime, release_date, genres, overview} = movie;

    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <button className='close-button' onClick={onClose}>&times;</button>
                <img src={`https://image.tmdb.org/t/p/w500${backdrop_path}`} alt="Backdrop" className='modal-backdrop' />
                <h2>{movie.title}</h2>
                <p><strong>Runtime:</strong>  {runtime} </p>
                <p><strong>Release Date:</strong>  {release_date} </p>
                <p><strong>Genres:</strong>  {genres.map(genre => genre.name).join(', ')} </p>
                <p><strong>Overview:</strong>  {overview} </p>
            </div>
        </div>
    )
}

export default Modal;
