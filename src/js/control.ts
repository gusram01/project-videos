import { validateUser } from "./users";
import { uriMovies } from "./apimovies";
import { processMoviesPreview } from './movies';

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
  (input.value.length > 0)
    ? backgroundInput(input, '--linkHover')
    : (backgroundInput(input, '--error'),
      setTimeout(() => { backgroundInput(input, '--font1') }, 600))
}

const goFwd = (user: string, pass: string) => {
  validateUser(user, pass);
  location.assign('/search');
}

const goSearch = (title: string) => {
  uriMovies.findByTitle(title, '3')
    .then(movies => {
      console.log(movies);
      processMoviesPreview(movies)
    }).catch(console.log);
}


/**
 * ==========================================
 *  Export functions - Principal Connection
 * ==========================================
 */

export const clearSearch = (input: HTMLInputElement) => {
  input.value = '';
  previewMovieContainer.innerHTML = '';
  favoritesContainer.innerHTML = '';
}

export const validateInputLogin = (userInput: HTMLInputElement, passInput: HTMLInputElement) => {

  (userInput.value.length === 0 || passInput.value.length === 0)
    ? (singleInputValidation(userInput),
      singleInputValidation(passInput))
    : goFwd(userInput.value, passInput.value);
}

export const validateInputSearch = (searchInput: HTMLInputElement) => {
  (searchInput.value.length > 0)
    ? goSearch(searchInput.value)
    : singleInputValidation(searchInput);
}
