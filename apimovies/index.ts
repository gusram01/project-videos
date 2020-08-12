import './css/styles.css';
import './css/links-btns-input.css';
import './css/login-search-container.css';
import './css/search-page.css';
import '../assets/img/icon.svg';
import '../assets/img/no-image.jpg';
import '../assets/img/login.jpg';
import '../assets/img/search.jpg';
import '../assets/img/favorites.jpg';
import { actualPath } from './js/principal';

const spanFooter = document.getElementById('leyend_footer') as HTMLElement;
const actualdate = new Date().getFullYear();

spanFooter.innerHTML = `Gus Ramírez, ${actualdate} <sup>&copy;</sup>`;

window.addEventListener('load', actualPath);

