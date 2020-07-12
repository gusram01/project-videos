import { Movie } from '../interfaces/User-Movies';

export default class ApiMovies {
  static readonly url = 'https://www.omdbapi.com/?apikey=53c8dc8f';

  public static async searchMovieByTitle(title: string): Promise<Movie[]> {
    const uri = `${this.url}&s=${title}`;
    try {
      const data = await (await fetch(uri)).json();
      return data.Search;

    } catch (error) {
      throw error;
    }
  }

  public static async searchMovieById(id: string): Promise<Movie> {
    const uri = `${this.url}&i=${id}`;
    try {
      const data = await (await fetch(uri)).json();
      return data;
    } catch (error) {
      throw error;
    }
  }

}
