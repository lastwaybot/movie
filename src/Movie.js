import React from 'react';
import { NavLink } from 'react-router-dom';
import { useGlobalContext } from './context';

// Default placeholder image URL
const PLACEHOLDER_IMAGE_URL = 'https://via.placeholder.com/200/200';

/**
 * Movie component that displays a grid of movies
 * @returns {JSX.Element} Movie grid or loading/error states
 */
const Movie = () => {
  const { movie, isLoading } = useGlobalContext();
  
  if (isLoading) {
    return <div className="loading"></div>;
  }

  // Handle no movies found
  if (!movie || (Array.isArray(movie) && movie.length === 0)) {
    return (
      <section className="movie-page">
        <div className="no-results">
          <h2>No movies found!</h2>
          <p>Please try a different genre or search term.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="movie-page">
      <div className="grid grid-4-col">
        {Array.isArray(movie) && movie.map((currentMovie) => {
          const { imdbID, Title, Poster } = currentMovie;
          const movieName = Title.substring(0, 15);
          const displayName = movieName.length > 13 
            ? `${movieName}...` 
            : movieName;
          const imageUrl = Poster === 'N/A' ? PLACEHOLDER_IMAGE_URL : Poster;

          return (
            <NavLink to={`movie/${imdbID}`} key={imdbID}>
              <div className="card">
                <div className="card-info">
                  <h2>{displayName}</h2>
                  <img src={imageUrl} alt={Title} />
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>
    </section>
  );
};

export default Movie;