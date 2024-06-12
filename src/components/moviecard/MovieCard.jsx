import './moviecard.css';

const MovieCard = ({movie, onClick}) => {
    const {title, backdrop_path, vote_average} = movie;

    return (
        <div className="card" onClick={() => onClick(movie)}>
            <div>
                <img src={`https://image.tmdb.org/t/p/w500${backdrop_path}`} alt="Movie Poster" className='card-img' />
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

export default MovieCard;
