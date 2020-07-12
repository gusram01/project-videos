import './styles.css';
import '../assets/icon.svg';
import '../assets/no-image.jpg';
import Principal from './classes/Principal';

const footer = document.querySelector('#leyend_footer');
const actualdate = new Date().getFullYear();

footer.innerHTML = `Gus Ramírez, ${actualdate} <sup>&copy;</sup>`;

Principal.main();
