import { NavLink, useParams } from 'react-router-dom';
import useFetch from './useFetch';

// Default placeholder image URL
const PLACEHOLDER_IMAGE_URL = 'https://via.placeholder.com/200/200';

/**
 * Back arrow SVG component
 * @returns {JSX.Element} SVG back arrow icon
 */
const BackArrow = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

/**
 * SingleMovie component that displays detailed movie information
 * @returns {JSX.Element} Movie details page or loading/error states
 */
const SingleMovie = () => {
  const { id } = useParams();
  const { isLoading, movie, isError } = useFetch(`&i=${id}`);

  if (isLoading) {
    return (
      <section className="movie-section">
        <div className="loading"></div>
      </section>
    );
  }

  if (isError.show) {
    return (
      <section className="movie-section">
        <div className="error">
          <h2>Error</h2>
          <p>{isError.msg}</p>
          <NavLink to="/" className="back-btn">
            <BackArrow />
          </NavLink>
        </div>
      </section>
    );
  }

  if (!movie) {
    return (
      <section className="movie-section">
        <div className="error">
          <h2>Movie Not Found</h2>
          <p>Could not find the movie details.</p>
          <NavLink to="/" className="back-btn">
            <BackArrow />
          </NavLink>
        </div>
      </section>
    );
  }

  const imageUrl = movie.Poster === 'N/A' ? PLACEHOLDER_IMAGE_URL : movie.Poster;

  /**
   * Handles image loading errors
   * @param {Event} event - Image error event
   */
  const handleImageError = (event) => {
    event.target.onerror = null;
    event.target.src = PLACEHOLDER_IMAGE_URL;
  };

  return (
    <section className="movie-section">
      <div className="movie-card">
        <figure>
          <img 
            src={imageUrl} 
            alt={movie.Title}
            onError={handleImageError}
          />
        </figure>
        <div className="card-content">
          <h2 className="title">{movie.Title}</h2>
          <div className="movie-info">
            <p className="card-text"><strong>Year:</strong> {movie.Year}</p>
            <p className="card-text"><strong>Released:</strong> {movie.Released}</p>
            <p className="card-text"><strong>Genre:</strong> {movie.Genre}</p>
            <p className="card-text"><strong>Director:</strong> {movie.Director}</p>
            <p className="card-text"><strong>Actors:</strong> {movie.Actors}</p>
            <p className="card-text"><strong>IMDB Rating:</strong> {movie.imdbRating} / 10</p>
            <p className="card-text"><strong>Country:</strong> {movie.Country}</p>
            <p className="card-text"><strong>Language:</strong> {movie.Language}</p>
            <p className="card-text"><strong>Runtime:</strong> {movie.Runtime}</p>
            <p className="card-text"><strong>Plot:</strong> {movie.Plot}</p>
          </div>
          
          <NavLink to="/" className="back-btn">
            <BackArrow />
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default SingleMovie;