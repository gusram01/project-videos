import { Movie, responseOmdb } from '../interfaces/User-Movies';

const url = 'https://www.omdbapi.com';
const apiKey = '53c8dc8f';

const getter = (dominio: string, apikey: string) => {
  const endpoint = `${dominio}/?apikey=${apikey}`;
  return ({
    findByTitle: async (title: string, page: number = 1): Promise<responseOmdb> => {
      return await (await fetch(`${endpoint}&s=${title}&page=${page}`)).json();
    },
    findById: async (id: string): Promise<Movie> => {
      return await (await fetch(`${endpoint}&i=${id}`)).json()
    }
  })
}

export const uriMovies = getter(url, apiKey);