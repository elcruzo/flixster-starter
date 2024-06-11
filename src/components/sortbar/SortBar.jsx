import './sortbar.css';

const SortBar = (props) => {
    return (
        <div>
            <select name="sort-by" id="">
                <option value="name">Sort by Name</option>
                <option value="likes">Sort by Likes</option>
                <option value="date">Sort by Date Added</option>
            </select>
        </div>
    )
}

export default SortBar
