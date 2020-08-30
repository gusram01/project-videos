import { movieDetail } from './render';
import { actualUser } from './users';
import { uriMovies } from './apimovies';
import { clearSearch, validateFavorites } from './control';

/**
 * ==========================================
 *          Secondary Functions
 * ==========================================
 */

const checkFavorites = async (idMovie: string) => {
  const infoUsers = actualUser();
  if (!infoUsers) return;
  const { user, array, indexUser } = infoUsers;
  const indexMovie = user.data.favorites!.findIndex(m => m.imdbID === idMovie);

  if (indexMovie < 0) {
    const data = await uriMovies.findById(idMovie);
    user.data.favorites!.push(data);
  } else {
    user.data.favorites!.splice(indexMovie, 1);
  }

  array.splice(indexUser, 1, user);
  localStorage.setItem('stor4g3AppV1d3o.l0cal', JSON.stringify(array));
  sessionStorage.setItem('Us3rActu4l', JSON.stringify(user));
}


/**
 * ==========================================
 *  Export function - Index Connection
 * ==========================================
 */

export const butttons = (ev: Event) => {
  const loginContainer = document.getElementById('login-container') as HTMLDivElement;
  const detailContainer = document.querySelector('.detail_container') as HTMLDivElement;
  const element = ev.target as HTMLElement;
  const idForClose = element.dataset.close;
  const idMovie = element.dataset.fav;
  const idDetail = element.dataset.details;


  if (!!idDetail) {
    ev.preventDefault();

    uriMovies.findById(idDetail.substring(1))
      .then(movie => {
        const fragment = movieDetail(movie);
        detailContainer.appendChild(fragment.cloneNode(true));
        detailContainer.classList.toggle('after');
      }).catch(console.log);
  }
  if (!!idMovie) {
    element.classList.toggle('fav');
    checkFavorites(idMovie)
  }
  if (!!idForClose) {
    detailContainer.classList.toggle('after');
    detailContainer.firstElementChild!.remove();
  }

  if (element.id === 'btn_close') {
    return sessionStorage.clear();
  }
  if (element.id === 'btn_favorites') {
    ev.preventDefault();
    return validateFavorites();
  }
  if (element.id === 'login_continue') {
    return loginContainer.classList.toggle('after');
  }
  if (element.id === 'login-container') {
    return loginContainer.classList.toggle('after');
  }
  if (element.id === 'btn_reset') {
    const title = document.getElementById('title') as HTMLInputElement;
    clearSearch();
    title.style.setProperty('--background', 'var(--bg3');
    return title.value = '';
  }
  if (element.matches('.detail_container')) {
    detailContainer.classList.toggle('after');
    return detailContainer.firstElementChild!.remove();
  }
  if (element.matches('.heart_login')) {
    return element.firstElementChild!.classList.toggle('fav');
  }
  if (element.matches('.more')) {
    if (window.location.pathname === '/apimovies'
      || window.location.pathname === '/apimovies/') {
      return loginContainer.classList.toggle('after');
    }
  }
  if (element.matches('.modal_close')) {
    ev.preventDefault();
    if (element.id === 'close-login') {
      return loginContainer.classList.toggle('after');
    }
  }

}
