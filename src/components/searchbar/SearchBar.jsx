import './searchbar.css';

const SearchBar = ({searchTerm, setSearchTerm}) => {
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div id="search-container">
            <input
            type="text"
            placeholder='Search movie title...'
            value={searchTerm}
            onChange={handleSearchChange} />
            <button type='submit' value="Submit">Search</button>
        </div>
    )
}

export default SearchBar;
