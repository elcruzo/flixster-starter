import './searchbar.css';

const SearchBar = ({searchTerm, setSearchTerm, onSearch}) => {
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchClick = () => {
        onSearch(searchTerm);
    }

    return (
        <div id="search-container">
            <input
            type="text"
            placeholder='Search movie title...'
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-textbox" />
            {/* <button type='button' onClick={handleSearchClick}>Search</button> */}
        </div>
    )
}

export default SearchBar;
