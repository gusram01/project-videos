import { Movie } from '../interfaces/User-Movies';


export default class Render {

  public element: HTMLDivElement;

  constructor(element: HTMLDivElement) {
    this.element = element;
  }

  public oneMoviePreview(movie: Movie) {
    const div = document.createElement('div');

    if (movie.Response === 'False') {
      movie = { Title: "Not found", imdbID: "000000", Type: "Undefined", Poster: "Not found" }
    };
    if (movie.Poster === 'N/A') movie.Poster = '/assets/no-image.jpg';

    div.className = 'movie_container';
    div.id = movie.imdbID;

    div.innerHTML = `
        <div class="img_preview">
          <img src="${movie.Poster}" alt="${movie.Title}" width="300px" height="300px">
        </div>
        <div class="description_movie">
          <div class="btn btn_details blur" id="details${movie.imdbID}"><small>More Details</small></div>
          <div class="blur">  
            <h3>"${movie.Title}"</h3>
            <h4>Type: ${movie.Type}</h4>
          </div>
          <div class="btn btn_id blur" id="add${movie.imdbID}">Add favorites</div>
        </div>

  `;
    this.element.appendChild(div);

  }

  public moviesArrayPreview(movies: Movie[]) {

    movies.forEach(movie => {
      this.oneMoviePreview(movie);
    });

  }

  public oneMovieDetail(movie: Movie) {

    const div: HTMLDivElement = document.createElement('div');
    if (movie.Poster === 'N/A') movie.Poster = '/assets/no-image.jpg';

    div.className = 'card_movie';
    div.id = "movie_details_container_receptor";
    div.innerHTML = `
        <div class="details_movie">
          <span class="modal_close">&times;</span>
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
    this.element.appendChild(div);

  }

  public detailArray(movies: Movie[]) {

    movies.forEach(movie => {
      const div: HTMLDivElement = document.createElement('div');
      if (movie.Poster === 'N/A') movie.Poster = '/assets/no-image.jpg';

      div.className = 'details';
      div.id = `details${movie.imdbID}`;
      div.innerHTML = `
          <span class="btn btn_action_favorites" id="del${movie.imdbID}">Remove Fav</span>
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

    `;
      this.element.appendChild(div);
    });

  }

}