
// Call the main functions the page is loaded
window.onload = () => {
  getOriginals()
  getTrendingNow()
  getTopRated()
}

//  dynamic API calls 
const fetchMovies = (url, dom_element, path_type) => {
 
  fetch(url)
  .then(response => {
    if(response.ok){
      return response.json()
    } else {
      throw new Error('Something went wrong!!!!')
    }
  }).then(data => {
    showMovies(data, dom_element, path_type)
  }).catch(error => {
    console.log(error)
  })

}

//  displays the movies to the DOM 
showMovies = (movies, dom_element, path_type) => {
  
   var moviesEl = document.querySelector(dom_element)
   console.log({moviesEl})

   console.log(movies)
   for (let movie of movies.results) {
    console.log(movie)

    // Within loop create an img element
    let imageElement = document.createElement('img')

    // Set attribute
    imageElement.setAttribute('data-id', movie.id)
    console.log(movie[path_type])

    // Set source
    imageElement.src = `https://image.tmdb.org/t/p/original${movie[path_type]}`
   
    moviesEl.appendChild(imageElement)
  
  }
}

//fetches Netflix Originals 
const getOriginals = () => {
  let url = 'https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213'
  fetchMovies(url, '.original__movies', 'poster_path')

}
//fetches Trending Movies 
const getTrendingNow = () => {
  let url = 'https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045'
  fetchMovies(url, '#trending', 'backdrop_path')

}
// fetches Top Rated Movies
const getTopRated = () => {
  let url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1'
  fetchMovies(url, '#top_rated', 'backdrop_path')

}
