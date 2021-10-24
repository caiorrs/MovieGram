import axios, { AxiosResponse } from 'axios';
// @ts-ignore
import { API_TOKEN, API_URL } from 'react-native-dotenv';
import * as Types from './types';

const baseURL = API_URL;
const headers = {
  Authorization: `Bearer ${API_TOKEN}`,
};

const APIInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers,
});

class API {
  static getDiscoverMovies({page=1, language="pt-BR", with_genres}: Types.discoverType): Promise<AxiosResponse<Types.discoverResponse>> {
    return APIInstance.get('/discover/movie/', { params: { page, language, with_genres: with_genres.join(",") } });
  }

  static getTrending({ media_type="movie", time_window="week", language = 'pt-BR' }: Types.trendingType): Promise<AxiosResponse<Types.trendingResponse>> {
    return APIInstance.get(`trending/${media_type}/${time_window}`, {params: language});
  }

  static getMoviesGenresList({language = 'pt-BR'}: Types.languageType): Promise<AxiosResponse<Types.genresListResponse>> {
    return APIInstance.get('genre/movie/list', {params: { language }});
  }

  static getMovieSearchResults({query, page = 1, language = 'pt-BR'}: Types.searchType): Promise<AxiosResponse<Types.movieSearchResult>> {
    return APIInstance.get('search/movie', { params: { query, page, language } });
  }

  static getAPIConfiguration(): Promise<AxiosResponse<Types.configurationResponse>>{
    return APIInstance.get('configuration', {})
  }

  static getMovieDetails({movie_id, language = 'pt-BR'}: Types.movieDetails): Promise<AxiosResponse<Types.movieDetailsResponse>>{
    return APIInstance.get(`movie/${movie_id}`, { params: { language } })
  }

  static getMovieProviders({movie_id, language = 'pt-BR'}: Types.movieDetails): Promise<AxiosResponse<Types.movieProvidersResponse>>{
    return APIInstance.get(`movie/${movie_id}/watch/providers`, { params: { language } })
  }

  static getMovieVideos({movie_id, language = 'pt-BR'}: Types.movieDetails): Promise<AxiosResponse<Types.movieVideosResponse>>{
    return APIInstance.get(`movie/${movie_id}/videos`, { params: { language } })
  }
}

export default API;
