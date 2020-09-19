import { Movie } from '../interfaces/User-Movies';
import { actualUser } from './users';


/**
 * ==========================================
 *                  Utilities
 * ==========================================
 */

const favoritesStorage = () => {
  const info = actualUser();
  //@ts-expect-error
  const favorites = info.user.data.favorites;
  //@ts-expect-error
  return favorites.map<string>(mov => mov.imdbID);
}



export const moviesPreview = (movies: Movie[]) => {
  const fragment = new DocumentFragment();
  const idsFavStorage = favoritesStorage();
  movies.forEach(movie => {
    const div = document.createElement('div');
    const fav = (idsFavStorage.includes(movie.imdbID!))
      ? 'fav'
      : '';

    if (movie.Poster === 'N/A') movie.Poster = '/assets/img/no-image.jpg';

    div.className = 'board';

    div.innerHTML = `
      <div class="img_prev">
        <img src="${movie.Poster}" alt="${movie.Title}">
      </div>

      <div class="board_title">
        <h2 class="title_prev">${movie.Title}</h2>
        <h4>Type: ${movie.Type}</h4>
      </div>
      <div class="board_body">
        
        <button class="btn more" data-details="d${movie.imdbID}">More Details</button>

        <button class="btn ${fav}" id="add${movie.imdbID}"  data-fav="${movie.imdbID}"><i class="fas fa-heart favicon"></i></button>
      
      </div>
`;
    fragment.appendChild(div);
  });
  return fragment;
}


export const movieDetail = (movie: Movie) => {
  const fragment = new DocumentFragment();
  const div: HTMLDivElement = document.createElement('div');
  const idsFavStorage = favoritesStorage();

  if (movie.Poster === 'N/A') movie.Poster = '/assets/img/no-image.jpg';
  const fav = (idsFavStorage.includes(movie.imdbID!))
    ? 'fav'
    : '';

  div.className = 'details_movie';
  div.innerHTML = ` <a href="#" class="modal_close" data-close="${movie.imdbID}">&times;</a>
                    <div class="image_wrapper">
                      <img src="${movie.Poster}" alt="${movie.Title}" />
                      <button class="btn ${fav}" id="add${movie.imdbID}"  data-fav="${movie.imdbID}"><i class="fas fa-heart favicon"></i></button>
                    </div>
                     
                    <div class="details_body">
                      <h2>${movie.Title}</h2>
                      <span>${movie.Country};</span>
                      <span>${movie.Year};</span>
                      <span>${movie.Director}.</span>
                      <p>
                      <h5>imdbRating: ${movie.imdbRating}</h5>
                      <h5>imdbVotes: ${movie.imdbVotes}</h5>
                      </p>
                      <p>${movie.Plot}</p>
                      <h4><small>${movie.Actors}</small></h4>
                    </div>`;
  fragment.appendChild(div);
  return fragment;
}

export const favorites = (favoritesStore: Movie[]) => {
  const fragment = new DocumentFragment();
  const idsFavStorage = favoritesStorage();

  favoritesStore.forEach(fav => {
    const div: HTMLDivElement = document.createElement('div');

    if (fav.Poster === 'N/A') fav.Poster = '/assets/img/no-image.jpg';
    const favIcon = (idsFavStorage.includes(fav.imdbID!))
      ? 'fav'
      : '';

    div.className = 'details_fav';
    div.innerHTML = `<div class="image_wrapper">
                      <img src="${fav.Poster}" alt="${fav.Title}" />
                      <button class="btn ${favIcon}" data-destroy="del${fav.imdbID}"><i class="fas fa-heart favicon"></i></button>
                    </div>
                     
                    <div class="details_body">
                      <h2>${fav.Title}</h2>
                      <span>${fav.Country};</span>
                      <span>${fav.Year};</span>
                      <span>${fav.Director}.</span>
                      <p>
                      <h5>imdbRating: ${fav.imdbRating}</h5>
                      <h5>imdbVotes: ${fav.imdbVotes}</h5>
                      </p>
                      <p>${fav.Plot}</p>
                      <h4><small>${fav.Actors}</small></h4>
                      <p class="text_details"> Awards: ${fav.Awards} </p>
                      <p class="text_details"> BoxOffice: ${fav.BoxOffice} </p>
                      <p class="text_details"> DVD: ${fav.DVD} </p>
                      <p class="text_details"> Genre: ${fav.Genre} </p>
                      <p class="text_details"> Language: ${fav.Language} </p>
                      <p class="text_details"> Metascore: ${fav.Metascore} </p>
                      <p class="text_details"> Production: ${fav.Production} </p>
                      <p class="text_details"> Rated: ${fav.Rated} </p>
                      <p class="text_details"> Released: ${fav.Released} </p>
                      <p class="text_details"> Runtime: ${fav.Runtime} </p>
                      <p class="text_details"> Website: ${fav.Website} </p>
                      <p class="text_details"> Writer: ${fav.Writer} </p>
                      <p class="text_details"> imdbVotes: ${fav.imdbVotes} </p>
                    </div>`;

    fragment.appendChild(div);
  });

  return fragment;
}
