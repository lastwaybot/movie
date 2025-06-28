import React from 'react';
import Movie from './Movie';
import Search from './Search';

/**
 * Home component that displays the main page with search and movie grid
 * @returns {JSX.Element} Home page layout
 */
function Home() {
  return (
    <div className="container">
      <Search />
      <Movie />
    </div>
  );
}

export default Home;