import React from 'react';
import PropTypes from 'prop-types';
import './sidebarmovieitem.css';

const SidebarMovieItem = ({ movie }) => {
    return (
        <div className='sidebar-movie-item'>
            <h4>{movie.title}</h4>
            <p><strong>Rating:</strong> {movie.vote_average}</p>
            <p><strong>Release Year:</strong> {new Date(movie.release_date).getFullYear()}</p>
        </div>
    )
}

SidebarMovieItem.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        vote_average: PropTypes.number,
        release_date: PropTypes.string
    }).isRequired
}

export default SidebarMovieItem;
