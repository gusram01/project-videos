import { clearSearch, goFwd, goSearch } from './control';


/**
 * ==========================================
 *                  Utilities
 * ==========================================
 */


const backgroundInput = (input: HTMLInputElement, customProperty: string) => {
  return input.style.setProperty('--background', `var(${customProperty})`);
}

const singleInputValidation = (input: HTMLInputElement) => {
  if (input.value.trim().length > 0) {
    backgroundInput(input, '--bg4')
    return true;
  } else {
    backgroundInput(input, '--error1');
    setTimeout(() => { backgroundInput(input, '--bg3') }, 600);
    return false;
  }
}


/**
 * ==========================================
 *            Secondary Functions
 * ==========================================
 */


const login = (ev: Event) => {
  const form = ev.target as HTMLFormElement
  const user = form.querySelector('.user') as HTMLInputElement;
  const password = form.querySelector('.password') as HTMLInputElement;

  ev.preventDefault();
  if (singleInputValidation(user) &&
    singleInputValidation(password)) {
    return goFwd(user.value, password.value);
  }
}

const search = async (ev: Event) => {
  const title = document.getElementById('title') as HTMLInputElement;

  ev.preventDefault();
  window.scrollTo(0, 0);
  if (singleInputValidation(title)) {
    clearSearch();
    return await goSearch(title.value);
  }
}

/**
 * ==========================================
 *    Export function - Index Connection
 * ==========================================
 */

export const actualPath = () => {
  const loginForm = document.getElementById('login_form') as HTMLFormElement;
  const searchForm = document.getElementById('search_form') as HTMLFormElement;

  (location.pathname === '/')
    ? (sessionStorage.clear()
      , loginForm.addEventListener('submit', login))
    : (sessionStorage.length === 0)
      ? location.assign('/')
      : searchForm.addEventListener('submit', search);
};
