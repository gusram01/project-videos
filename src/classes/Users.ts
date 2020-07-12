import { Movie, User } from '../interfaces/User-Movies';

export default class Users {

  public _id: string;
  public data: {
    user: string;
    password: string;
    favorites?: Array<Movie>;
  };

  constructor(user: string, password: string, favorites: Array<Movie> = []) {
    this._id = user + password;
    this.data = {
      user: user,
      password: password,
      favorites: favorites
    };
  }

  public save() {

    const usersArray = localStorage.getItem('stor4g3AppV1d3o.l0cal');
    const newUser = {
      _id: this._id,
      data: this.data
    };

    if (!usersArray) {

      localStorage.setItem('stor4g3AppV1d3o.l0cal', JSON.stringify([newUser]));
      sessionStorage.setItem('Us3rActu4l', JSON.stringify(newUser));

    } else {

      const usersJSON: User[] = JSON.parse(usersArray);
      const userStorage: User | undefined = usersJSON.find(element => element._id === this._id);

      if (!userStorage) {

        usersJSON.push(newUser);

        localStorage.setItem('stor4g3AppV1d3o.l0cal', JSON.stringify(usersJSON));
        sessionStorage.setItem('Us3rActu4l', JSON.stringify(newUser));

      } else {

        sessionStorage.setItem('Us3rActu4l', JSON.stringify(userStorage));

      }
    }

  }

  public addFavoriteMovies(movie: Movie) {

    const usersArray = localStorage.getItem('stor4g3AppV1d3o.l0cal');
    const usersJSON: User[] = JSON.parse(usersArray);
    const userStorage: User | undefined = usersJSON.find(element => element._id === this._id);
    const indexUserStorage: number = usersJSON.findIndex(element => element._id === this._id);

    const indexDelMovie = userStorage.data.favorites.findIndex(m => m.imdbID === movie.imdbID);
    if (indexDelMovie < 0) userStorage.data.favorites.push(movie);

    usersJSON.splice(indexUserStorage, 1, userStorage);

    localStorage.setItem('stor4g3AppV1d3o.l0cal', JSON.stringify(usersJSON));
    sessionStorage.setItem('Us3rActu4l', JSON.stringify(userStorage));

  }

  public delFavoriteMovie(movie: Movie) {

    const usersArray = localStorage.getItem('stor4g3AppV1d3o.l0cal');
    const usersJSON: User[] = JSON.parse(usersArray);
    const userStorage: User | undefined = usersJSON.find(element => element._id === this._id);
    const indexUserStorage: number = usersJSON.findIndex(element => element._id === this._id);

    const indexDelMovie = userStorage.data.favorites.findIndex(m => m.imdbID === movie.imdbID);
    userStorage.data.favorites.splice(indexDelMovie, 1);

    usersJSON.splice(indexUserStorage, 1, userStorage);

    localStorage.setItem('stor4g3AppV1d3o.l0cal', JSON.stringify(usersJSON));
    sessionStorage.setItem('Us3rActu4l', JSON.stringify(userStorage));

  }


}