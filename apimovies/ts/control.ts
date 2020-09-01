import { createNewUser, actualUser } from "./users";
import { uriMovies } from "./apimovies";
import { Movie } from '../interfaces/User-Movies';
import { responseOmdb } from "../interfaces/User-Movies";
import { moviesPreview, favorites } from './render';


const previewMovieContainer = document.getElementById('parent_container') as HTMLDivElement;
const favoritesContainer = document.querySelector('.favorites_container') as HTMLElement;
const emptyFavorites = document.querySelector('.empty_favorites') as HTMLElement;

/**
 * ==========================================
 *                  Utilities
 * ==========================================
 */

const renderFavoritesStorage = (favoritesStore: Movie[]) => {
  const fragment = favorites(favoritesStore);
  clearSearch();
  favoritesContainer.appendChild(fragment.cloneNode(true));
}

const processMoviesPreview = (movies: Movie[]) => {
  const fragment = moviesPreview(movies);
  previewMovieContainer.appendChild(fragment.cloneNode(true));
}

const setObserver = (callback: IntersectionObserverCallback) => {
  const observer = new IntersectionObserver(callback);
  observer.observe(previewMovieContainer.lastElementChild!);
}

const emptyMovies = () => {
  return [{
    Title: "Sorry Title not found",
    imdbID: "000000",
    Type: "Undefined",
    Poster: "Not found"
  }];
}

/**
 * ==========================================
 *         Second front - Main process
 * ==========================================
 */

const processResponseOmdb = (data: responseOmdb) => {
  const ok = JSON.parse(data.Response.toLowerCase());
  const pages = +data.totalResults / 10;
  const movies = data.Search;

  (!ok)
    ? processMoviesPreview(emptyMovies())
    : processMoviesPreview(movies);
  return pages;
};


/**
 * ==========================================
 *  Export functions - Principal Connection
 * ==========================================
 */

export const clearSearch = () => {
  previewMovieContainer.innerHTML = '';
  favoritesContainer.innerHTML = '';

}

export const goFwd = (user: string, pass: string) => {
  createNewUser(user, pass);
  location.assign('/apimovies/search/');
}

export const goSearch = async (title: string, page = 1) => {
  const data = await uriMovies.findByTitle(title, page);
  const pagesResult = processResponseOmdb(data);

  if (Number.isNaN(pagesResult) || page > pagesResult) {
    console.log('no more results');
  } else {
    setObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          goSearch(title, ++page)
          observer.unobserve(entry.target);
        }
      })
    });
  }

}

export const validateFavorites = () => {
  const info = actualUser();
  (!info || info.user.data.favorites?.length === 0)
    ? (clearSearch()
      , emptyFavorites.classList.toggle('after'))
    : renderFavoritesStorage(info.user.data.favorites!);
}
