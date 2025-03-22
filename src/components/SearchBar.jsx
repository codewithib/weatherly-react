import { useState } from "react";

const SearchBar = ({ handleSearch }) => {
    const [city, setCity] = useState("");

    return (
        <form onSubmit={(e) => handleSearch(e, city)}>
            <input 
                type="text" 
                className="city-text" 
                placeholder="Enter City name and hit search"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button type="submit" className="search">
                Search
            </button>
        </form>
    );
};

export default SearchBar;
