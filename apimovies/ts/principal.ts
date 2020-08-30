import { validateInputLogin, validateInputSearch } from './control';


/**
 * ==========================================
 *            Secondary Functions
 * ==========================================
 */


const login = (ev: Event) => {
  ev.preventDefault();
  const form = ev.target as HTMLFormElement
  const user = form.querySelector('.user') as HTMLInputElement;
  const password = form.querySelector('.password') as HTMLInputElement;

  validateInputLogin(user, password);
}

const search = (ev: Event) => {
  const title = document.getElementById('title') as HTMLInputElement;

  ev.preventDefault();
  window.scrollTo(0, 0);
  validateInputSearch(title);
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

export const actualPath = () => {
  const loginForm = document.getElementById('login_form') as HTMLFormElement;
  const searchForm = document.getElementById('search_form') as HTMLFormElement;

  (location.pathname === '/apimovies/' || location.pathname === '/apimovies')
    ? (sessionStorage.clear()
      , loginForm.addEventListener('submit', login))
    : (redirectHome()
      , searchForm.addEventListener('submit', search));
};
