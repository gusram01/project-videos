import { Movie } from '../interfaces/User-Movies';

const url = 'https://www.omdbapi.com';
const apiKey = '53c8dc8f';

const getter = (dominio: string, apikey: string) => {
  const endpoint = `${dominio}/?apikey=${apikey}`;
  return ({
    findByTitle: async (title: string, page: string = '1'): Promise<Movie[]> => {
      return (await (await fetch(`${endpoint}&s=${title}&page=${page}`)).json()).Search
    },
    findById: async (id: string): Promise<Movie> => {
      return await (await fetch(`${endpoint}&i=${id}`)).json()
    }
  })
}

export const uriMovies = getter(url, apiKey);