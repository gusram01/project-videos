export interface User {
  _id: string;
  data: {
    user: string;
    password: string;
    favorites?: Array<Movie>;
  }
}

export interface Movie {

  imdbID?: string;
  Title?: string;
  Year?: string;
  Rated?: string;
  Released?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Poster?: string;
  imdbRating?: string;
  Production?: string;
  Response?: string;
  Type?: string;

}
