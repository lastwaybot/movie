import React from 'react';
import { useGlobalContext } from './context';

/**
 * Search component for movie search and genre selection
 * @returns {JSX.Element} Search interface with input and genre buttons
 */
function Search() {
  const { query, setQuery, isError, setGenre } = useGlobalContext();

  // Available movie genres
  const genres = [
    'Action',
    'Comedy',
    'Drama',
    'Horror',
    'Sci-Fi',
    'Thriller',
    'Romance',
    'Adventure',
    'Animation',
    'Documentary'
  ];

  /**
   * Handles form submission (prevents default behavior)
   * @param {Event} event - Form submission event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <section className="search-section">
      <h2>Discover Amazing Movies</h2>
      <div className="search-container">
        <form action="#" onSubmit={handleSubmit}>
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Search for movies..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
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