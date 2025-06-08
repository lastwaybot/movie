import React from "react";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "./context";

const imgUrl = "https://via.placeholder.com/200/200";

const Movie = () => {
  const { movie, isLoading } = useGlobalContext();
  
  if (isLoading) {
    return <div className="loading">Loading....</div>;
  }

  // Check if movie is null or an empty array (no results)
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
    <>
      <section className="movie-page">
        <div className="grid grid-4-col">
          {/* Ensure movie is an array before mapping */}
          {Array.isArray(movie) && movie.map((curMovieElem) => {
                const { imdbID, Title, Poster } = curMovieElem;
                const movieName = Title.substring(0, 15);

                return (
                  <NavLink to={`movie/${imdbID}`} key={imdbID}>
                    <div className="card">
                      <div className="card-info">
                        <h2>
                          {movieName.length > 13
                            ? `${movieName}...`
                            : movieName}
                        </h2>
                        <img src={Poster === "N/A" ? imgUrl : Poster} alt="#" />
                      </div>
                    </div>
                  </NavLink>
                );
              })}
        </div>
      </section>
    </>
  );
};

export default Movie;