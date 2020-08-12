import { movieDetail, moviesPreview, favorites } from './render';
import { actualUser } from './users';
import { Movie } from '../interfaces/User-Movies';
import { uriMovies } from './apimovies';
import { clearSearch } from './control';


const previewMovieContainer = document.getElementById('parent_container') as HTMLDivElement;
const favoritesContainer = document.querySelector('.favorites_container') as HTMLDivElement;
const detailContainer = document.querySelector('.detail_container') as HTMLDivElement;

const listenDetailContainer = (ev: MouseEvent) => {
  const element = ev.target as HTMLElement;
  const idForClose = element.dataset.close;
  const principalNode = element.parentElement!.parentElement!.parentElement as HTMLElement;

  (!!idForClose)
    ? (principalNode.classList.toggle('after')
      , principalNode.firstElementChild!.remove())
    : false;
}

const checkFavorites = (idMovie: string) => {
  const infoUsers = actualUser();
  if (!infoUsers) return;
  const { user, array, indexUser } = infoUsers;
  const indexMovie = user.data.favorites!.findIndex(m => m.imdbID === idMovie);

  if (indexMovie < 0) {
    uriMovies.findById(idMovie).then(data => {
      user.data.favorites!.push(data);
      array.splice(indexUser, 1, user);
      localStorage.setItem('stor4g3AppV1d3o.l0cal', JSON.stringify(array));
      sessionStorage.setItem('Us3rActu4l', JSON.stringify(user));
    }).catch(console.log);
  } else {
    user.data.favorites!.splice(indexMovie, 1);
    array.splice(indexUser, 1, user);
    localStorage.setItem('stor4g3AppV1d3o.l0cal', JSON.stringify(array));
    sessionStorage.setItem('Us3rActu4l', JSON.stringify(user));
  }
}

const renderDetail = (idMovie: string) => {
  uriMovies.findById(idMovie)
    .then(movie => {
      const fragment = movieDetail(movie);
      detailContainer.appendChild(fragment.cloneNode(true));
      detailContainer.classList.toggle('after');
      detailContainer.firstElementChild!.classList.toggle('after');
      detailContainer.addEventListener('click', listenDetailContainer);
    }).catch(console.log);
}

const listenPreviewMovieContainer = (ev: MouseEvent) => {
  const element = ev.target as HTMLElement;
  const idMovie = element.dataset.fav;
  const idDetail = element.dataset.details;

  if (!!idMovie) {
    element.classList.toggle('fav');
    checkFavorites(idMovie)
  }
  if (!!idDetail) {
    renderDetail(idDetail.substring(1))
  }
}

/**
 * ==========================================
 *  Export function - Control Connection
 * ==========================================
 */

export const favoritesStore = () => {
  const data = actualUser();
  if (!data) return;
  const { user } = data;
  return user.data.favorites;
}

export const renderFavoritesStorage = (favoritesStore: Movie[]) => {
  const fragment = favorites(favoritesStore);
  clearSearch();
  favoritesContainer.appendChild(fragment.cloneNode(true));
}

export const processMoviesPreview = (movies: Movie[]) => {
  //@ts-expect-error
  const idsFavsStorage = favoritesStore()!.map<string>(mov => mov.imdbID);
  const fragment = moviesPreview(movies, idsFavsStorage);
  previewMovieContainer.appendChild(fragment.cloneNode(true));
  previewMovieContainer.addEventListener('click', listenPreviewMovieContainer);
}
