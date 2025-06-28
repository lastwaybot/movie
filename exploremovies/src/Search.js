import React from "react";
import { useGlobalContext } from "./context";

function Search() {
  const { query, setQuery, isError, setGenre } = useGlobalContext();

  const genres = [
    "Action",
    "Comedy",
    "Drama",
    "Horror",
    "Sci-Fi",
    "Thriller",
    "Romance",
    "Adventure",
    "Animation",
    "Documentary"
  ];

  return (
    <section className="search-section">
      <h2>Discover Amazing Movies</h2>
      <div className="search-container">
        <form action="#" onSubmit={(e) => e.preventDefault()}>
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Search for movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="search-btn">
              🔍
            </button>
          </div>
        </form>
        <div className="genre-buttons">
          {genres.map((genre) => (
            <button
              key={genre}
              className="genre-btn"
              onClick={() => setGenre(genre.toLowerCase())}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
      <div className="card-error">
        <p>{isError.show && isError.msg}</p>
      </div>
    </section>
  );
}

export default Search;