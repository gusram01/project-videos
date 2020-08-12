import { validateInputLogin, validateInputSearch, clearSearch, validateFavorites } from './control';

const loginForm = document.getElementById('login_form') as HTMLFormElement;
const searchForm = document.getElementById('search_form') as HTMLFormElement;
const body = document.querySelector('.body') as HTMLBodyElement;

const login = (ev: Event) => {
  ev.preventDefault();
  const form = ev.target as HTMLFormElement
  const user = form.querySelector('#user') as HTMLInputElement;
  const password = form.querySelector('#password') as HTMLInputElement;

  validateInputLogin(user, password);
}

const search = (ev: Event) => {
  ev.preventDefault();
  const form = ev.target as HTMLFormElement
  const title = form.querySelector('#title') as HTMLInputElement;

  //@ts-expect-error
  const element = ev.submitter as HTMLElement;
  (element.id === 'btn_reset')
    ? (clearSearch()
      , title.value = '')
    : validateInputSearch(title);
}

const butttons = (ev: Event) => {
  const element = ev.target as HTMLElement
  if (element.id === 'btn_close') return sessionStorage.clear();
  if (element.id === 'btn_favorites') return validateFavorites(element);
  if (element.id === 'login_continue') {
    element.parentElement!.firstElementChild!.nextElementSibling!.classList.toggle('after');
    element.parentElement!.firstElementChild!.classList.toggle('after');
    element.classList.toggle('after');
  }
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
  body.addEventListener('click', butttons);
  if (location.pathname === '/apimovies') {
    sessionStorage.clear();
    loginForm.addEventListener('submit', login);
  }
  if (location.pathname === '/apimovies/search')
    redirectHome();
  searchForm.addEventListener('submit', search);
};
