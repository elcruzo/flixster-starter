import {useEffect, useState} from 'react';
import './modal.css'
import PropTypes from 'prop-types';

function GetYoutubeVideo(movie_id) {
    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTE0NWJmMDkzMjhiODlmMTMxZTRkN2M0YWE5NTZjYyIsInN1YiI6IjY2Njc3OTc3ZjlkNjI5MGE0YmRkYjRhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.twUqBPeVcAH9gkl6PwZr2680GBrIAHo_-0jo2TslfHs'
        }
    };

    const url = `https://api.themoviedb.org/3/movie/${movie_id}/videos`

    return fetch(url, options)
        .then(response => {
        if (response.ok) {
            return response.json();
        }
        }).then(data => {
        if (data) {

            for (let i = 0; i < data.results.length; i++) {
            if (data.results[i].type == "Trailer") {
                return data.results[i].key;
            }
            }
        }

        return null;
    })
}

const Modal = ({ movie, onClose, isSidebarOpen }) => {
    if (!movie) return null;

    const {backdrop_path, poster_path, vote_average, runtime, release_date, genres, overview, title} = movie;
    const [videoID, setVideoID] = useState(null);

    useEffect(() => {
        GetYoutubeVideo(movie.id).then((videoID) => {
            setVideoID(videoID);
        })
    }, [movie.id])

    const handleOutsideClick = (event) => {
        if (event.target.classList.contains('modal-overlay')) {
            onClose();
        }
    }

    useEffect(() => {
        window.addEventListener('click', handleOutsideClick);

        return () => {
            window.removeEventListener('click', handleOutsideClick)
        }
    }, [])



    return (
        <div className="modal-overlay">
            <div className='modal-content' style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://image.tmdb.org/t/p/original/${backdrop_path})`, backgroundSize: "cover", backgroundPosition: "center"}}>
                <button className='modal-close-button' onClick={onClose}>&times;</button>
                <div className='modal-top'>
                    <div className='modal-image-container'>
                        <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="Image" className='modal-img' />
                    </div>
                    <div className='modal-text-container'>
                        <h2>{title}</h2>
                        <hr />
                        <div className='modal-text-sub-container'>
                            <p><strong>Rating:</strong> {vote_average}</p>
                            <p><strong>Duration:</strong>  {convertRuntime(runtime)} </p>
                            <p><strong>Release Date:</strong>  {release_date} </p>
                            <p><strong>Genres:</strong>  {Array.isArray(genres) ? genres.map(genre => genre.name).join(', ') : 'N/A'} </p>
                        </div>
                    </div>
                </div>
                <div className='modal-bottom'>
                    <button><strong>Overview</strong></button>
                    <p>{overview}</p>
                </div>
                <iframe width="100%" height="300px" src={`https://www.youtube.com/embed/${videoID}?autoplay=1`} title="Work &amp; Jazz ☕Bossa Nova Tropical Ambience ~ Relaxing Bossa Nova Jazz with Chill Scenery ~ Summertime" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
        </div>
    )
}

const convertRuntime = (runtime) => {
    const hours = Math.floor(runtime/60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`
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
