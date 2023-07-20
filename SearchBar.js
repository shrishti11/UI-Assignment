import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({setResults}) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((user) => {
          return (
            value &&
            user &&
            user.title &&
            user.title.toLowerCase().includes(value)
          );
        });
        setResults(results)
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };
  return (
    <>
      <div className="input-wrapper">
        <input
          placeholder="Search"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    </>
  );
};

export default SearchBar;
