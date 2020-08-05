import './styles.css';
import '../assets/icon.svg';
import '../assets/no-image.jpg';
import { actualPath } from './js/principal';

const footer = document.getElementById('leyend_footer');
const actualdate = new Date().getFullYear();

footer.innerHTML = `Gus Ramírez, ${actualdate} <sup>&copy;</sup>`;

window.addEventListener('DOMContentLoaded', actualPath);

