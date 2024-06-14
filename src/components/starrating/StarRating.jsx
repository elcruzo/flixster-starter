import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/fontawesome-free-solid';
import { faStar as regularStar } from '@fortawesome/fontawesome-free-regular';
import './starrating.css';

const StarRating = ({ rating }) => {
    // Convert rating (range 1-8) to a scale of 0-5
    const starRating = Math.min(Math.max((rating / 8) * 5, 0), 5);
    const solidStars = Math.floor(starRating);
    const hasHalfStar = starRating - solidStars >= 0.6;

    return (
        <div className="star-rating">
            {[...Array(5)].map((_, index) => {
                if (index < solidStars) {
                    return <FontAwesomeIcon key={index} icon={solidStar} />;
                } else if (index === solidStars && hasHalfStar) {
                    return <FontAwesomeIcon key={index} icon={solidStar} style={{ clipPath: 'inset(0 50% 0 0)' }} />;
                } else {
                    return <FontAwesomeIcon key={index} icon={regularStar} />;
                }
            })}
        </div>
    );
};

StarRating.propTypes = {
    rating: PropTypes.number.isRequired
};

export default StarRating;
