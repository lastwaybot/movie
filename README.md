# ExploreMovies

ExploreMovies is a modern React application that allows users to discover, search, and view detailed information about movies. The app features a user-friendly interface, genre-based browsing, and a dark/light theme toggle for optimal viewing comfort.

## Features

- **Movie Discovery**: Browse trending and popular movies.
- **Search**: Find movies by title or keywords.
- **Detailed Movie Pages**: View ratings, genres, plots, and other details.
- **Genre Selection**: Filter movies based on genres.
- **Dark/Light Theme Toggle**: Switch between light and dark modes for comfortable viewing.
- **Responsive Design**: Fully responsive layout for desktop and mobile.
- **Context-based State Management**: Uses React Context for theme and app state.
- **API Integration**: Fetches real movie data from the [Open Movie Database (OMDb) API](https://www.omdbapi.com/). (Make sure to provide your own API key in `.env`.)

## Screenshots

![Homepage](../homepage.png)
![Genre Selection](../genre%20selected.png)
![Movie Details](../movie%20details.png)
![Search](../search.png)

## Getting Started

### Prerequisites

- Node.js (v14 or above recommended)
- npm (v6 or above)

### Installation

```bash
cd exploremovies
npm install
```

### Environment Variables

Create a `.env` file in the `exploremovies` directory and add your OMDb API key:

```
REACT_APP_API_KEY=your_api_key_here
```

### Running the App

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Build for Production

```bash
npm run build
```

### Run Tests

```bash
npm test
```

## Deployment

### Live Demo

This project is deployed on Netlify for instant access:

👉 **[View the Live Demo on Netlify](https://ykmovies.netlify.app/)**

### Deploying to Netlify

You can easily deploy your own fork to Netlify:

1. **Fork this repository** to your own GitHub account.
2. **Sign in** to [Netlify](https://www.netlify.com/) and click "New site from Git".
3. **Connect your GitHub account** and select your ExploreMovies repository.
4. **Set build command** to `npm run build` and the publish directory to `exploremovies/build`.
5. **Add environment variables:**  
   Go to "Site settings" → "Build & deploy" → "Environment" and add your `REACT_APP_API_KEY`.
6. **Deploy your site** and enjoy your own live version!

Netlify provides automatic CI/CD, so every push to your repo will trigger a new deployment.

## Project Structure

- `src/`
  - `App.js`: Main app component.
  - `Home.js`, `Movie.js`, `SingleMovie.js`, `Search.js`: Core UI pages.
  - `ThemeContext.js`: Provides dark/light theme context.
  - `ThemeToggle.js`: UI component for toggling the theme.
  - `context.js`: Shared state and logic.
  - `useFetch.js`: Custom hook for API requests.
  - `App.css`, `ThemeToggle.css`, etc.: Styling.

## Dark/Light Theme Toggle

ExploreMovies includes a dark/light theme toggle for accessibility and user comfort.

- The theme state is managed using React Context (`ThemeContext.js`).
- The toggle button (`ThemeToggle.js`) allows users to switch themes instantly.
- Theme preferences are applied across all components.
- Easily extensible for further customization.

## API Integration

This project uses the [Open Movie Database (OMDb) API](https://www.omdbapi.com/) for fetching real-time movie data.  
You must sign up at [OMDb](https://www.omdbapi.com/apikey.aspx) to obtain your own API key and set it in the `.env` file as shown above.


## License

[MIT](../LICENSE) © lastwaybot

## Future Scope

- **User Authentication**: Let users save favorites or create watchlists.
- **Movie Recommendations**: Suggest movies based on user behavior.
- **Reviews & Ratings**: Allow users to submit and view reviews.
- **Internationalization**: Support for multiple languages.
- **Performance Optimizations**: Further optimize for mobile and slow networks.
- **Advanced Filtering**: Filter by year, rating, actor, etc.
- **Accessibility Enhancements**: Improve ARIA support and keyboard navigation.
- **Progressive Web App (PWA)**: Enable offline capabilities and app-like experience.
- **More Theme Customization**: Allow users to select accent colors or use system theme.

---

> Made with ❤️ using React and deployed on Netlify, powered by the OMDb API.
