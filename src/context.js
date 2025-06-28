import React, { useContext, useState, useEffect } from "react";
import useFetch from "./useFetch";

const AppContext = React.createContext();

/**
 * AppProvider component that manages global state
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} Context provider with global state
 */
const AppProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [isRandom, setIsRandom] = useState(false);

  // Available movie genres
  const genresList = [
    "action",
    "comedy",
    "drama",
    "horror",
    "sci-fi",
    "thriller",
    "romance",
    "adventure",
    "animation",
    "documentary"
  ];

  // Determine the search parameter for useFetch
  let searchParam = "";
  if (genre) {
    searchParam = `&s=${genre}`;
  } else if (query) {
    searchParam = `&s=${query}`;
  } else if (isRandom) {
    // Default random genre if no specific genre or query is set
    searchParam = "&s=action";
  }

  console.log("Context: searchParam before useFetch:", searchParam);

  const { isLoading, isError, movie } = useFetch(searchParam);

  /**
   * Generates a random movie genre and sets it
   */
  const getRandomMovies = () => {
    const randomGenre = genresList[Math.floor(Math.random() * genresList.length)];
    setGenre(randomGenre);
    setQuery(""); // Clear any existing search query
    setIsRandom(true);
  };

  /**
   * Handles genre selection
   * @param {string} selectedGenre - The selected genre
   */
  const handleGenreSelect = (selectedGenre) => {
    setGenre(selectedGenre);
    setQuery(""); // Clear search query when genre is selected
    setIsRandom(false); // No longer random if a genre is explicitly selected
  };

  /**
   * Handles search query updates
   * @param {string} searchQuery - The search query
   */
  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setGenre(""); // Clear genre when searching by name
    setIsRandom(false);
  };

  // Fetch random movies on initial load
  useEffect(() => {
    // Only call getRandomMovies if no search query or genre is active
    if (!query && !genre) {
      getRandomMovies();
    }
  }, [query, genre]); // Depend on query and genre to avoid re-triggering

  return (
    <AppContext.Provider
      value={{
        isLoading,
        isError,
        movie,
        query,
        setQuery: handleSearch,
        genre,
        setGenre: handleGenreSelect,
        getRandomMovies,
        isRandom
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

/**
 * Custom hook to use the global context
 * @returns {Object} Global context values
 */
const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };