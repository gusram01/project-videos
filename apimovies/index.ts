import './css/styles.css';
import './css/links-btns-input.css';
import './css/main-login.css';
import './css/login-search-container.css';
import './css/search-page.css';
import '../assets/img/icon.svg';
import '../assets/img/no-image.jpg';
import '../assets/img/login.jpg';
import '../assets/img/search.jpg';
import '../assets/img/favorites.jpg';
import { actualPath } from './ts/principal';

const spanFooter = document.getElementById('leyend_footer') as HTMLElement;
const actualdate = new Date().getFullYear();

spanFooter.textContent = `Gus Ramírez, ${actualdate}®`;

window.addEventListener('load', actualPath);

