import { Movie } from '../interfaces/User-Movies';


export const moviesPreview = (movies: Movie[], idsFavStorage: string[]) => {
  const fragment = new DocumentFragment();

  movies.forEach(movie => {
    const div = document.createElement('div');
    const fav = (idsFavStorage.includes(movie.imdbID))
      ? 'fav'
      : '';

    if (movie.Response === 'False') {
      movie = { Title: "Not found", imdbID: "000000", Type: "Undefined", Poster: "Not found" }
    };
    if (movie.Poster === 'N/A') movie.Poster = '/assets/no-image.jpg';

    div.className = 'movie_container';
    div.id = movie.imdbID;

    div.innerHTML = `
      <div class="img_preview">
        <img class= "image" src="${movie.Poster}" alt="${movie.Title}" width="300px" height="300px">
      </div>  
      <div class="description_movie">
        <h2>"${movie.Title}"</h2>
        <h4>Type: ${movie.Type}</h4>
        <div class="btn btn_fav blur ${fav}" id="add${movie.imdbID}" data-fav="${movie.imdbID}">Add favorites</div>
        <div class="btn btn_details blur" data-details="d${movie.imdbID}"><small>More Details</small></div>
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
  div.id = "movie_details_container_receptor";
  div.innerHTML = `
      <div class="details_movie">
        <span class="modal_close" data-close="${movie.imdbID}">&times;</span>
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

