import { validateInputLogin, validateInputSearch, clearSearch } from './control';

const loginForm = document.getElementById('login_form') as HTMLFormElement;
const searchForm = document.getElementById('search_form') as HTMLFormElement;
const user = document.getElementById('user') as HTMLInputElement;
const password = document.getElementById('password') as HTMLInputElement;
const title = document.getElementById('title') as HTMLInputElement;
const menuSearch = document.querySelector('.menu_search') as HTMLUListElement;


const login = (ev: Event) => {
  ev.preventDefault();
  validateInputLogin(user, password);
}

const search = (ev: Event) => {
  ev.preventDefault();
  //@ts-expect-error
  const element = ev.submitter as HTMLElement;
  (element.id === 'btn_reset')
    ? clearSearch(title)
    : validateInputSearch(title);
}

const navButtons = (ev: Event) => {
  const element = ev.target as HTMLElement
  if (element.id === 'btn_close') return sessionStorage.clear();
  if (element.id === 'btn_favorites') { }
}

const redirectHome = () => {
  (sessionStorage.length === 0)
    ? location.assign('/')
    : true;
}

/**
 * ==========================================
 *    Export function - Index Connection
 * ==========================================
 */

export const actualPath = (ev: Event) => {
  (location.pathname === '/')
    ? (sessionStorage.clear()
      , loginForm.addEventListener('submit', login))
    : (redirectHome()
      , menuSearch.addEventListener('click', navButtons)
      , searchForm.addEventListener('submit', search));
};

  //   btnFavorites.addEventListener('click', (ev: Event) => {
  //     ev.preventDefault();
  //     previewMovieContainer.innerHTML = '';
  //     control.favorites();
  //   });
