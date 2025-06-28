import { NavLink, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const imgUrl = "https://via.placeholder.com/200/200";

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
            Go Back
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
            Go Back
          </NavLink>
        </div>
      </section>
    );
  }

  return (
    <section className="movie-section">
      <div className="movie-card">
        <figure>
          <img 
            src={movie.Poster === "N/A" ? imgUrl : movie.Poster} 
            alt={movie.Title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = imgUrl;
            }}
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
            Go Back
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default SingleMovie;