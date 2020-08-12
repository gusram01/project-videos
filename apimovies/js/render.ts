import { Movie } from '../interfaces/User-Movies';


export const moviesPreview = (movies: Movie[], idsFavStorage: string[]) => {
  const fragment = new DocumentFragment();

  movies.forEach(movie => {
    const div = document.createElement('div');
    const fav = (idsFavStorage.includes(movie.imdbID!))
      ? 'fav'
      : '';

    if (movie.Poster === 'N/A') movie.Poster = '/assets/no-image.jpg';

    div.className = 'movie_container';

    div.innerHTML = `
      <div class="img_preview">
        <img class= "image" src="${movie.Poster}" alt="${movie.Title}" width="300px" height="300px">
      </div>  
      <div class="description_movie">
        <h2>"${movie.Title}"</h2>
        <h4>Type: ${movie.Type}</h4>
        <button class="btn btn_fav ${fav}" id="add${movie.imdbID}" data-fav="${movie.imdbID}">Add favorites</button>
        <button class="btn btn_details " data-details="d${movie.imdbID}"><small>More Details</small></button>
      </div>

`;
    fragment.appendChild(div);
  });
  return fragment;
}


export const movieDetail = (movie: Movie) => {
  const fragment = new DocumentFragment();
  const div: HTMLDivElement = document.createElement('div');
  if (movie.Poster === 'N/A') movie.Poster = '/assets/no-image.jpg';

  div.className = 'card_movie';
  div.innerHTML = `
      <div class="details_movie">
        <button class="btn modal_close" data-close="${movie.imdbID}">&times;</button>
        <div class="image_detail_container">
          <img src="${movie.Poster}" alt="${movie.Title}" />
          <div class="rating"><span>imdbRating: ${movie.imdbRating}</span></div>
        </div>

        <div class="movie_details_container">
          <div class="movie_title">
            <h2>${movie.Title}</h2>
          </div>

          <div class="movie_min_details">
            <span>${movie.Country};</span>
            <span>${movie.Year};</span>
            <span>${movie.Director}.</span>
          </div>

          <div class="movie_description">
            <p>${movie.Plot}</p>
          </div>

          <div class="movie_actors">
            <h5><small>${movie.Actors}</small></h5>
          </div>

        </div>

      </div>
  `;
  fragment.appendChild(div);
  return fragment;
}

export const favorites = (favoritesStore: Movie[]) => {
  const fragment = new DocumentFragment();

  favoritesStore.forEach(fav => {
    const div = document.createElement('div');

    div.innerHTML = `
              <div class="card_favorite">

                <button class="btn fav_close" data-close="${fav.imdbID}">&times;</button>

                <div class="image_fav">
                  <img src="${fav.Poster}" alt="${fav.Title}" />
                </div>

                <div class="details_fav">

                  <div class="fav_title">
                    <h2>${fav.Title}</h2>
                  </div>

                  <div class="fav_info">
                    <span>${fav.Country};</span>
                    <span>${fav.Year};</span>
                    <span>${fav.Director}.</span>
                  </div>

                  <div class="fav_description">
                    <p>${fav.Plot}</p>
                  </div>

                  <div class="fav_actors">
                    <h5><small>${fav.Actors}</small></h5>
                  </div>

                  <div class="rating"><span>imdbRating: ${fav.imdbRating}</span></div>

                </div>
              </div>
    `;

    fragment.appendChild(div.firstElementChild!);
  });

  return fragment;
}

/**
 *
Actors: "Will Friedle, Kevin Conroy, Mark Hamill, Angie Harmon"
Awards: "3 wins & 5 nominations."
BoxOffice: "N/A"
Country: "USA"
DVD: "12 Dec 2000"
Director: "Curt Geda"
Genre: "Animation, Action, Crime, Sci-Fi, Thriller"
Language: "English"
Metascore: "N/A"
Plot: "The Joker is back with a vengeance, and Gotham's newest Dark Knight needs answers as he stands alone to face Gotham's most infamous Clown Prince of Crime."
Poster: "https://m.media-amazon.com/images/M/MV5BNmRmODEwNzctYzU1MS00ZDQ1LWI2NWMtZWFkNTQwNDg1ZDFiXkEyXkFqcGdeQXVyNTI4MjkwNjA@._V1_SX300.jpg"
Production: "Warner Home Video"
Rated: "PG-13"
Ratings: (2) [{…}, {…}]
Released: "12 Dec 2000"
Response: "True"
Runtime: "76 min"
Title: "Batman Beyond: Return of the Joker"
Type: "movie"
Website: "N/A"
Writer: "Bob Kane (character created by: Batman), Paul Dini (story), Glen Murakami (story), Bruce Timm (story), Paul Dini (screenplay)"
Year: "2000"
imdbID: "tt0233298"
imdbRating: "7.8"
imdbVotes: "22,702"
 */