import { validateUser } from "./users";
import { uriMovies } from "./apimovies";
import { processMoviesPreview, favoritesStore, renderFavoritesStorage } from './movies';
import { responseOmdb } from "../interfaces/User-Movies";

const previewMovieContainer = document.getElementById('parent_container') as HTMLDivElement;
const favoritesContainer = document.querySelector('.favorites_container') as HTMLDivElement;

/**
 * ==========================================
 *         Second front - Main process
 * ==========================================
 */

const backgroundInput = (input: HTMLInputElement, customProperty: string) => {
  return input.style.setProperty('background', `var(${customProperty})`);
}

const singleInputValidation = (input: HTMLInputElement) => {
  if (input.value.length > 0) {
    backgroundInput(input, '--bg4')
    return true;
  } else {
    backgroundInput(input, '--error1');
    setTimeout(() => { backgroundInput(input, '--bg3') }, 600);
    return false;
  }
}

const emptyFavorites = () => {
  const search = document.getElementById('search_form') as HTMLFormElement;
  const h3 = favoritesContainer.nextElementSibling as HTMLElement;
  previewMovieContainer.innerHTML = '';
  h3.classList.toggle('after');
  search.classList.toggle('after');

  setTimeout(() => {
    h3.classList.toggle('after');
    search.classList.toggle('after');
  }, 900);
}

const setObserver = (cb: IntersectionObserverCallback) => {
  let observer = new IntersectionObserver(cb);
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
  validateUser(user, pass);
  location.assign('/apimovies/search');
}

const goSearch = async (title: string, page: number = 1) => {
  const data = await uriMovies.findByTitle(title, page);
  const pagesResult = processResponseOmdb(data);

  if (isNaN(pagesResult) || page > pagesResult) {
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

export const validateFavorites = (eventTarget: HTMLElement) => {
  const favorites = favoritesStore();
  (favorites!.length > 0)
    ? renderFavoritesStorage(favorites!)
    : emptyFavorites();
}

export const validateInputLogin = (userInput: HTMLInputElement, passInput: HTMLInputElement) => {

  if (singleInputValidation(userInput) &&
    singleInputValidation(passInput)) {
    return goFwd(userInput.value, passInput.value);
  }
}

export const validateInputSearch = async (searchInput: HTMLInputElement) => {
  (searchInput.value.trim().length > 0)
    ? (clearSearch()
      , await goSearch(searchInput.value))
    : singleInputValidation(searchInput);
}
