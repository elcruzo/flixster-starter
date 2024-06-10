
const SearchBox = () => {
    return (
        <>
            <div>
                <input type="text" />
                <button type='submit' value="Submit">Search</button>
            </div>

            <div>
                <select name="sort-by" id="">
                    <option value="name">Sort by Name</option>
                    <option value="likes">Sort by Likes</option>
                    <option value="date">Sort by Date Added</option>
                </select>
            </div>
        </>
    )
}

export default SearchBox;
