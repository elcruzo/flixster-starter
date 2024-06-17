import './searchbar.css';

const SearchBar = ({searchTerm, setSearchTerm, onSearch}) => {
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div id="search-container">
            <input
            type="text"
            placeholder='Search movie title...'
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-textbox" />
        </div>
    )
}

export default SearchBar;
