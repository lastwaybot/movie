import { useState, useEffect } from "react";

// setting the api link
const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

const useFetch = (apiParams) => {
  console.log("useFetch: apiParams received:", apiParams);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState({ show: "false", msg: "" });
  const [movie, setMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [castMovies, setCastMovies] = useState([]);

  const getMovie = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.Response === "True") {
        setIsLoading(false);
        setMovie(data.Search || data);
        setIsError({ show: "false", msg: "" });

        // If we have a single movie (not search results), fetch additional details
        if (!data.Search && data.imdbID) {
          const detailsRes = await fetch(`${API_URL}&i=${data.imdbID}&plot=full`);
          const detailsData = await detailsRes.json();
          setMovieDetails(detailsData);

          // Fetch movies for each cast member
          if (detailsData.Actors) {
            const actors = detailsData.Actors.split(", ").slice(0, 3); // Get top 3 actors
            const castMoviesPromises = actors.map(async (actor) => {
              const actorRes = await fetch(`${API_URL}&s=${encodeURIComponent(actor)}`);
              const actorData = await actorRes.json();
              return {
                actor,
                movies: actorData.Search ? actorData.Search.slice(0, 5) : [] // Get top 5 movies per actor
              };
            });

            const castMoviesData = await Promise.all(castMoviesPromises);
            setCastMovies(castMoviesData);
          }
        }
      } else {
        setIsError({ show: "true", msg: data.Error });
      }
    } catch (error) {
      console.log(error);
      setIsError({ show: "true", msg: "An error occurred while fetching data." });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Only make the API call if apiParams is not empty
    // apiParams will be in the format '&s=search_term' or '&i=imdbID'
    if (apiParams && apiParams.length > 3) { // Checks if apiParams is something like '&s=a'
      let timeOut = setTimeout(() => {
        getMovie(`${API_URL}${apiParams}`);
      }, 1000);
      return () => {
        clearTimeout(timeOut);
      };
    } else {
      // If apiParams is empty or too short (e.g., just '&s=' or '&i=')
      setIsLoading(false);
      setIsError({ show: "true", msg: "Please enter a search term or select a genre." });
      setMovie(null); // Clear previous movie results
      setMovieDetails(null);
      setCastMovies([]);
    }
  }, [apiParams]);

  return { isLoading, isError, movie, movieDetails, castMovies };
};

export default useFetch;