import './moviecard.css';

const MovieCard = (props) => {

    let movie = props.movie;

    let movieId = movie.id;
    let movieTitle = movie.title;
    let moviePoster = movie.backdrop_path;
    let movieRating = movie.vote_average

    return (
        <div className="card">
            <div>
                <img src={ "https://image.tmdb.org/t/p/w500" + moviePoster} alt="Movie Poster" className='card-img' />
            </div>
            <div>
                <h2>{movieTitle}</h2>
                <div>
                    <p>Rating: {movie.movieRating}</p>
                </div>
            </div>
        </div>
    )
}

export default MovieCard;
