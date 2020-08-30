import '../css/styles.css';
import '../css/links-btns-input.css';
import '../css/main-login.css';
import '../css/search-page.css';
import '../../assets/img/icon.svg';
import '../../assets/img/no-image.jpg';
import '../../assets/img/login.jpg';
import '../../assets/img/search.jpg';
import '../../assets/img/favorites.jpg';
import { actualPath } from './principal';
import { navEffect } from './nav';
import { butttons } from './listener';

const body = document.querySelector('.body') as HTMLBodyElement;
const spanFooter = document.getElementById('leyend_footer') as HTMLElement;
const actualdate = new Date().getFullYear();

spanFooter.textContent = `Gus Ramírez, ${actualdate}®`;
spanFooter.style.fontWeight = '600';


window.addEventListener('load', actualPath);
window.addEventListener('scroll', navEffect);
body.addEventListener('click', butttons);

