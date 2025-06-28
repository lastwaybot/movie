import { useState, useEffect } from 'react';

// API configuration constants
const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

/**
 * Custom hook for fetching movie data from OMDB API
 * @param {string} apiParams - API parameters for the request
 * @returns {Object} Object containing loading state, error state, and movie data
 */
const useFetch = (apiParams) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState({ show: false, msg: '' });
  const [movie, setMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);

  /**
   * Fetches movie data from the API
   * @param {string} url - The complete API URL
   */
  const getMovie = async (url) => {
    setIsLoading(true);
    
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.Response === 'True') {
        setMovie(data.Search || data);
        setIsError({ show: false, msg: '' });

        // Fetch additional details for single movie
        if (!data.Search && data.imdbID) {
          const detailsResponse = await fetch(`${API_URL}&i=${data.imdbID}&plot=full`);
          const detailsData = await detailsResponse.json();
          
          if (detailsData.Response === 'True') {
            setMovieDetails(detailsData);
          }
        }
      } else {
        setIsError({ show: true, msg: data.Error || 'Movie not found' });
        setMovie(null);
        setMovieDetails(null);
      }
    } catch (error) {
      console.error('Error fetching movie:', error);
      setIsError({ show: true, msg: 'An error occurred while fetching data' });
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
      
      // Set a new timeout for debounced search
      timeoutId = setTimeout(() => {
        getMovie(`${API_URL}${apiParams}`);
      }, 500);
    } else {
      setIsLoading(false);
      setIsError({ show: true, msg: 'Please enter a search term or select a genre' });
      setMovie(null);
      setMovieDetails(null);
    }

    // Cleanup function to clear timeout
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [apiParams]);

  return { isLoading, isError, movie: movieDetails || movie };
};

export default useFetch;