import Control from './Control';

export default class Principal {

  private constructor() {
    this.init();
  }

  static main() {
    return new Principal();
  }

  private init() {
    const user: HTMLInputElement = document.querySelector('#user');
    const password: HTMLInputElement = document.querySelector('#password');
    const title: HTMLInputElement = document.querySelector('#title');
    const idMovie: HTMLInputElement = document.querySelector('#imdb_id');
    const btnLogin: HTMLAnchorElement = document.querySelector('#btn_login');
    const btnSearch: HTMLButtonElement = document.querySelector('#btn_find');
    const btnClear: HTMLButtonElement = document.querySelector('#btn_reset');
    const btnClose: HTMLAnchorElement = document.querySelector('#btn_close');
    const btnFavorites: HTMLAnchorElement = document.querySelector('#btn_favorites');
    const previewMovieContainer: HTMLDivElement = document.querySelector('#parent_container');
    const favoritesContainer: HTMLDivElement = document.querySelector('.favorites_container');

    const control = new Control({ user, password, title, idMovie });


    window.addEventListener('load', () => {

      if (location.pathname === '/') {
        sessionStorage.clear();

        password.addEventListener('keyup', (ev: KeyboardEvent) => {
          if (ev.key === 'Enter') control.login();
        });

        btnLogin.addEventListener('click', (ev: Event) => {
          ev.preventDefault();
          control.login();
        });

      } else {

        if (sessionStorage.length === 0) location.assign('/');

        btnClose.addEventListener('click', () => {
          favoritesContainer.innerHTML = '';
          previewMovieContainer.innerHTML = '';
          sessionStorage.clear();
        });

        btnSearch.addEventListener('click', async (ev: Event) => {
          ev.preventDefault();
          favoritesContainer.innerHTML = '';
          control.search();
        });

        btnClear.addEventListener('click', () => {
          previewMovieContainer.innerHTML = '';
          favoritesContainer.innerHTML = '';
        });

        btnFavorites.addEventListener('click', (ev: Event) => {
          ev.preventDefault();
          previewMovieContainer.innerHTML = '';
          control.favorites();
        });

      }

    });

  }

}
