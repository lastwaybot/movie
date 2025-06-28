import React, { useContext, useState, useEffect } from "react";
import useFetch from "./useFetch";

const AppContext = React.createContext();

// we are getting the children and that is app component in our case
const AppProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [isRandom, setIsRandom] = useState(false);

  // Determine the search parameter for useFetch
  let searchParam = "";
  if (genre) {
    searchParam = `&s=${genre}`;
  } else if (query) {
    searchParam = `&s=${query}`;
  } else if (isRandom) {
    // This case should ideally be handled by getRandomMovies setting a genre
    searchParam = `&s=action`; // Default random genre if somehow no genre or query
  }

  console.log("Context: searchParam before useFetch:", searchParam);

  const { isLoading, isError, movie } = useFetch(searchParam);

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

  const getRandomMovies = () => {
    const randomGenre = genresList[Math.floor(Math.random() * genresList.length)];
    setGenre(randomGenre);
    setQuery(""); // Clear any existing search query
    setIsRandom(true);
  };

  const handleGenreSelect = (selectedGenre) => {
    setGenre(selectedGenre);
    setQuery(""); // Clear search query when genre is selected
    setIsRandom(false); // No longer random if a genre is explicitly selected
  };

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

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };