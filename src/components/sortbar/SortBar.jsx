import './sortbar.css';
import PropTypes from 'prop-types';

const SortBar = ({ genres, selectedGenre, setSelectedGenre, selectedSort, setSelectedSort }) => {
    const handleGenreChange = (event) => {
        setSelectedGenre(event.target.value);
    };

    const handleSortChange = (event) => {
        setSelectedSort(event.target.value);
    };

    return (
        <div className='sortbar'>
            <select name="genre" value={selectedGenre} onChange={handleGenreChange} className='sortbar-genre'>
                <option value="">All Genres</option>
                {genres && genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                        {genre.name}
                    </option>
                ))}
            </select>

            <select name="sort-by" value={selectedSort} onChange={handleSortChange} className='sortbar-sortby'>
                <option value="populaarity.desc">Sort by Popularity</option>
                <option value="release_date.desc">Sort by Release Date</option>
            </select>
        </div>
    )
}

SortBar.propTypes = {
    genres: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired
        })
        ).isRequired,
        selectedGenre: PropTypes.string.isRequired,
        setSelectedGenre: PropTypes.func.isRequired,
        selectedSort: PropTypes.string.isRequired,
        setSelectedSort: PropTypes.func.isRequired
};


export default SortBar
