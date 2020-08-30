import { createNewUser, actualUser } from "./users";
import { uriMovies } from "./apimovies";
import { Movie } from '../interfaces/User-Movies';
import { responseOmdb } from "../interfaces/User-Movies";
import { moviesPreview, favorites } from './render';


const previewMovieContainer = document.getElementById('parent_container') as HTMLDivElement;
const favoritesContainer = document.querySelector('.favorites_container') as HTMLDivElement;

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
  const info = actualUser();
  //@ts-expect-error
  const favorites = info.user.data.favorites;
  //@ts-expect-error
  const idsFavsStorage = favorites.map<string>(mov => mov.imdbID);
  const fragment = moviesPreview(movies, idsFavsStorage);
  previewMovieContainer.appendChild(fragment.cloneNode(true));
}


/**
 * ==========================================
 *         Second front - Main process
 * ==========================================
 */

const backgroundInput = (input: HTMLInputElement, customProperty: string) => {
  return input.style.setProperty('--background', `var(${customProperty})`);
}

const singleInputValidation = (input: HTMLInputElement) => {
  if (input.value.trim().length > 0) {
    backgroundInput(input, '--bg4')
    return true;
  } else {
    backgroundInput(input, '--error1');
    setTimeout(() => { backgroundInput(input, '--bg3') }, 600);
    return false;
  }
}

const setObserver = (callback: IntersectionObserverCallback) => {
  const observer = new IntersectionObserver(callback);
  observer.observe(previewMovieContainer.lastElementChild!);
};

const emptyMovies = () => {
  return [{
    Title: "Sorry Title not found",
    imdbID: "000000",
    Type: "Undefined",
    Poster: "Not found"
  }];
}

const processResponseOmdb = (data: responseOmdb) => {
  const ok = JSON.parse(data.Response.toLowerCase());
  const pages = +data.totalResults / 10;
  const movies = data.Search;

  (!ok)
    ? processMoviesPreview(emptyMovies())
    : processMoviesPreview(movies);
  return pages;
};

const goFwd = (user: string, pass: string) => {
  createNewUser(user, pass);
  location.assign('/apimovies/search/');
}

const goSearch = async (title: string, page = 1) => {
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

/**
 * ==========================================
 *  Export functions - Principal Connection
 * ==========================================
 */

export const clearSearch = () => {
  previewMovieContainer.innerHTML = '';
  favoritesContainer.innerHTML = '';
}

export const validateFavorites = () => {
  const info = actualUser();
  (!info || info.user.data.favorites?.length === 0)
    ? console.log('fav is empty')
    : renderFavoritesStorage(info.user.data.favorites!);
}

export const validateInputLogin = (userInput: HTMLInputElement, passInput: HTMLInputElement) => {

  if (singleInputValidation(userInput) &&
    singleInputValidation(passInput)) {
    return goFwd(userInput.value, passInput.value);
  }
}

export const validateInputSearch = async (searchInput: HTMLInputElement) => {
  if (singleInputValidation(searchInput)) {
    clearSearch();
    return await goSearch(searchInput.value);
  }
}
