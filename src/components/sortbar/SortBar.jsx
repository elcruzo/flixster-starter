import './sortbar.css';

const SortBar = ({ genres, selectedGenre, setSelectedGenre, selectedSort, setSelectedSort }) => {
    const handleGenreChange = (event) => {
        setSelectedGenre(event.target.value);
    };

    const handleSortChange = (event) => {
        setSelectedSort(event.target.value);
    };

    return (
        <div className='sortbar'>
            <select name="genre" value={selectedGenre} onChange={handleGenreChange}>
                <option value="">All Genres</option>
                {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                        {genre.name}
                    </option>
                ))}
            </select>
            <select name="sort-by" value={selectedSort} onChange={handleSortChange}>
                <option value="populaarity.desc">Sort by Name</option>
                <option value="release_date.desc">Sort by Likes</option>
            </select>
        </div>
    )
}

export default SortBar
