import { Movie, TemplateControl, User } from '../interfaces/User-Movies';
import Users from "./Users";
import ApiMovies from "./Apimovies";
import Render from "./RenderDom";


export default class Control {
  private previewMoviesContainer: HTMLDivElement = document.querySelector('#parent_container');
  private favoritesContainer: HTMLDivElement = document.querySelector('.favorites_container');
  private args: TemplateControl;

  constructor({ ...args }) {
    this.args = args;
  }

  public logger() {
    const { user, password } = this.args;

    console.log(user);
    console.log(password);
  }

  public login() {
    const { user, password } = this.args;

    if (user.value.length === 0 || password.value.length === 0) {
      if (user.value.length === 0) {
        user.style.background = 'var(--error)';
        setTimeout(() => {
          user.style.background = 'var(--font1)';
        }, 600);
      }
      if (password.value.length === 0) {
        password.style.background = 'var(--error)';
        setTimeout(() => {
          password.style.background = 'var(--font1)';
        }, 600);
      }
    } else {

      this.entryUser(user.value, password.value);

    }
  }

  public search() {
    const { title } = this.args;
    const index = this.indexSearch();

    switch (index) {
      case 1:
        if (title.value.length === 0) {
          title.style.background = 'var(--error)';
          setTimeout(() => {
            title.style.background = 'var(--font1)';
          }, 600);
        }
        break;
      case 2:
        ApiMovies.searchMovieByTitle(title.value)
          .then(movies => {
            this.previewMoviesContainer.innerHTML = '';
            this.renderArray(movies);
            this.arrayListeners(movies.map((m: Movie) => m.imdbID));
          }).catch(console.log);
        break;
      default: ;
    }
  }

  public favorites() {
    const btnFavorites: HTMLAnchorElement = document.querySelector('#btn_favorites');
    const sectionSearch: HTMLElement = document.querySelector('.search_container');
    const labelFavorites: HTMLElement = document.querySelector('#empty_favorites');
    const userActual = sessionStorage.getItem('Us3rActu4l');
    const userParse: User = JSON.parse(userActual);


    if (userParse.data.favorites.length === 0) {
      sectionSearch.style.display = 'none';
      labelFavorites.style.opacity = '1';
      setTimeout(() => {
        labelFavorites.style.opacity = '0';
        sectionSearch.style.display = 'flex';
      }, 600);

    } else {

      if (this.favoritesContainer.childElementCount > 0) {
        this.favoritesContainer.innerHTML = '';
        sectionSearch.style.display = 'flex';
        labelFavorites.style.display = 'flex';
        btnFavorites.textContent = `Favorites`;

      } else {
        this.favoritesContainer.innerHTML = '';
        sectionSearch.style.display = 'none';
        labelFavorites.style.display = 'none';
        btnFavorites.textContent = `close Fav's`;
        this.renderFavorites();

      }

    }

  }

  private entryUser(user: string, password: string) {
    const juanito = new Users(user, password);
    juanito.save();
    location.assign('/search');
  }

  private indexSearch() {
    const { title } = this.args;
    if (title.value.length === 0) return 1;
    if (title.value.length !== 0) return 2;

  }

  private renderOne(movie: Movie) {
    const render = new Render(this.previewMoviesContainer);
    render.oneMoviePreview(movie);
  }

  private renderArray(movies: Array<Movie>) {
    const render = new Render(this.previewMoviesContainer);
    render.moviesArrayPreview(movies);
  }

  private async listener(id: string) {
    const addFavorite = document.querySelector(`#add${id}`);
    const showDetail = document.querySelector(`#details${id}`);
    const userActual: User = JSON.parse(sessionStorage.getItem('Us3rActu4l'));
    const updateUser = new Users(userActual.data.user, userActual.data.password);
    let movie = await ApiMovies.searchMovieById(id);

    showDetail.addEventListener('click', (ev: Event) => {
      ev.preventDefault();
      this.renderDetail(movie);

    });

    addFavorite.addEventListener('click', (ev) => {
      ev.preventDefault();

      updateUser.addFavoriteMovies(movie);

      document.querySelector(`#${id}`).remove();
    });

  }

  private arrayListeners(moviesID: string[]) {

    for (let id of moviesID) {
      this.listener(id);
    }
  }

  private renderDetail(movie: Movie) {
    const detailContainer: HTMLDivElement = document.querySelector('.detail_container');
    const render = new Render(detailContainer);
    render.oneMovieDetail(movie);

    const modalClose = document.querySelector('.modal_close');
    const cardMovie = document.querySelector('.card_movie');
    modalClose.addEventListener('click', () => {
      cardMovie.remove();
    });

  }

  private renderFavorites() {
    const favoritesContainer: HTMLDivElement = document.querySelector('.favorites_container');
    const btnFavorites: HTMLAnchorElement = document.querySelector('#btn_favorites');
    const sectionSearch: HTMLElement = document.querySelector('.search_container');
    const labelFavorites: HTMLElement = document.querySelector('#empty_favorites');
    const userActual = sessionStorage.getItem('Us3rActu4l');

    const userParse: User = JSON.parse(userActual);
    const updateUser = new Users(userParse.data.user, userParse.data.password);

    const render = new Render(favoritesContainer);
    render.detailArray(userParse.data.favorites);

    userParse.data.favorites.forEach(movie => {
      const delFavorite = document.querySelector(`#del${movie.imdbID}`);

      delFavorite.addEventListener('click', (ev) => {
        ev.preventDefault();


        updateUser.delFavoriteMovie(movie);
        document.querySelector(`#details${movie.imdbID}`).remove();
        if (favoritesContainer.childElementCount === 0) {
          favoritesContainer.innerHTML = '';
          sectionSearch.style.display = 'flex';
          labelFavorites.style.display = 'flex';
          btnFavorites.textContent = `Favorites`;
        }



      });

    });

  }

}