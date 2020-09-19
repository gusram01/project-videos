const header = document.querySelector('.header_search') as HTMLElement;
const navPricipal = document.querySelector('.nav_footer') as HTMLElement;
let moveY = 0;


export const navEffect = (e: Event) => {

  if (window.location.pathname === '/search') {
    (moveY < window.scrollY)
      ? (header.style.setProperty('--moveY', '-150%')
        , navPricipal.style.setProperty('--moveNY', '200%')
        , moveY = window.scrollY - 1)
      : (header.style.setProperty('--moveY', '0')
        , navPricipal.style.setProperty('--moveNY', '0')
        , moveY = window.scrollY);
  }
};