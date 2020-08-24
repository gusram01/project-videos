import { Movie, responseOmdb } from '../interfaces/User-Movies';

const url = 'https://www.omdbapi.com';
const apiKey = '53c8dc8f';

const getter = (dominio: string, apikey: string) => {
  const endpoint = `${dominio}/?apikey=${apikey}`;
  return ({
    findByTitle: async (title: string, page = 1) => {
      return await (await fetch(`${endpoint}&s=${title}&page=${page}`)).json() as Promise<responseOmdb>;
    },
    findById: async (id: string) => {
      return await (await fetch(`${endpoint}&i=${id}`)).json() as Promise<Movie>;
    }
  })
}

export const uriMovies = getter(url, apiKey);