// Call the main functions when the page is loaded
window.onload = () => {
  getOriginals();
  getTrendingNow();
  getTopRated();
};

// Dynamic API calls
const fetchMovies = async (url, dom_element, path_type) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Something went wrong!!!!');
    }

    const data = await response.json();
    showMovies(data, dom_element, path_type);
  } catch (error) {
    console.log(error);
  }
};

// Displays the movies to the DOM
const showMovies = (movies, dom_element, path_type) => {
  const moviesEl = document.querySelector(dom_element);
  console.log({ moviesEl });

  console.log(movies);
  for (const movie of movies.results) {
    console.log(movie);

    // Create an img element
    const imageElement = document.createElement('img');

    // Set attribute
    imageElement.setAttribute('data-id', movie.id);
    console.log(movie[path_type]);

    // Set source
    imageElement.src = `https://image.tmdb.org/t/p/original${movie[path_type]}`;

    moviesEl.appendChild(imageElement);
  }
};

// Fetches Netflix Originals
const getOriginals = () => {
  const url =
    'https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213';
  fetchMovies(url, '.original__movies', 'poster_path');
};

// Fetches Trending Movies
const getTrendingNow = () => {
  const url =
    'https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045';
  fetchMovies(url, '#trending', 'backdrop_path');
};

// Fetches Top Rated Movies
const getTopRated = () => {
  const url =
    'https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1';
  fetchMovies(url, '#top_rated', 'backdrop_path');
};
