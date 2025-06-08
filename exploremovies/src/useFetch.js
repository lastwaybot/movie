import { useState, useEffect } from "react";

// setting the api link
const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

const useFetch = (apiParams) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState({ show: false, msg: "" });
  const [movie, setMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);

  const getMovie = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.Response === "True") {
        setMovie(data.Search || data);
        setIsError({ show: false, msg: "" });

        // If we have a single movie (not search results), fetch additional details
        if (!data.Search && data.imdbID) {
          const detailsRes = await fetch(`${API_URL}&i=${data.imdbID}&plot=full`);
          const detailsData = await detailsRes.json();
          if (detailsData.Response === "True") {
            setMovieDetails(detailsData);
          }
        }
      } else {
        setIsError({ show: true, msg: data.Error || "Movie not found" });
        setMovie(null);
        setMovieDetails(null);
      }
    } catch (error) {
      console.error("Error fetching movie:", error);
      setIsError({ show: true, msg: "An error occurred while fetching data" });
      setMovie(null);
      setMovieDetails(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let timeoutId;
    
    if (apiParams && apiParams.length > 3) {
      // Clear any existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      // Set a new timeout
      timeoutId = setTimeout(() => {
        getMovie(`${API_URL}${apiParams}`);
      }, 500); // Reduced debounce time to 500ms
    } else {
      setIsLoading(false);
      setIsError({ show: true, msg: "Please enter a search term or select a genre" });
      setMovie(null);
      setMovieDetails(null);
    }

    // Cleanup function
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [apiParams]);

  return { isLoading, isError, movie: movieDetails || movie };
};

export default useFetch;