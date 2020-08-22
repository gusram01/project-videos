import { validateInputLogin, validateInputSearch, clearSearch, validateFavorites } from './control';

const loginForm = document.getElementById('login_form') as HTMLFormElement;
const searchForm = document.getElementById('search_form') as HTMLFormElement;
const body = document.querySelector('.body') as HTMLBodyElement;

const login = (ev: Event) => {
  ev.preventDefault();
  const form = ev.target as HTMLFormElement
  const user = form.querySelector('.user') as HTMLInputElement;
  const password = form.querySelector('.password') as HTMLInputElement;

  validateInputLogin(user, password);
}

const search = (ev: Event) => {
  const title = document.getElementById('title') as HTMLInputElement;
  //@ts-expect-error
  const element = ev.submitter as HTMLElement;

  ev.preventDefault();

  (element.id === 'btn_reset')
    ? (clearSearch()
      , title.value = '')
    : validateInputSearch(title);
}

const butttons = (ev: Event) => {
  const loginContainer = document.getElementById('login-container') as HTMLDivElement;
  const element = ev.target as HTMLElement
  if (element.id === 'btn_close') return sessionStorage.clear();
  if (element.id === 'btn_favorites') return validateFavorites();
  if (element.id === 'login_continue') return loginContainer.classList.toggle('after');
  if (element.id === 'login-container') return loginContainer.classList.toggle('after');
  if (element.id === 'close-login') return loginContainer.classList.toggle('after');
  if (element.matches('.modal_close')) return ev.preventDefault();
}

const redirectHome = () => {
  (sessionStorage.length === 0)
    ? location.assign('/apimovies')
    : true;
}

/**
 * ==========================================
 *    Export function - Index Connection
 * ==========================================
 */

export const actualPath = (ev: Event) => {
  (location.pathname === '/apimovies/' || location.pathname === '/apimovies')
    ? (sessionStorage.clear()
      , loginForm.addEventListener('submit', login))
    : (redirectHome()
      , searchForm.addEventListener('submit', search));
  body.addEventListener('click', butttons);
};
