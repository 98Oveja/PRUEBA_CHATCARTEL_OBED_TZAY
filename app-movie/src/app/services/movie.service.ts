import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = '25adcd44887b4ce3d640721e22c185ef';
  // private sessionId:string | null = localStorage.getItem('sessionId');

  constructor(private http: HttpClient) {}

  getNowPlaying(page: number=1, searchParams?: any): Observable<any> {
    //parametros del endppoint now-playing, pero manipulandolo para ordenarlo por fecha de mayor a menor y para búsqued
    // no use el endpoint como tal de https://api.themoviedb.org/3/movie/now_playing, para manipular las búsquedas
  //include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}'
    let params = new HttpParams().set('api_key', this.apiKey)
                              .set('include_adult', false)
                              .set('include_video', false)
                              .set('language', 'en-US')
                              .set('page', page.toString())
                              .set('sort_by', 'popularity.desc')
                              .set('with_release_type', (2/3).toString())
                              .set('release_date.gte', '{min_date}')
                              .set('release_date.lte', '{max_date}');
                              // .set('sort_by', 'primary_release_date.desc');

    // let params = new HttpParams().set('api_key', this.apiKey).set('page', page.toString()).set('sort_by', 'primary_release_date.desc');

    if(searchParams){
      if(searchParams.query){
        params = params.set('query', searchParams.query);
        return this.http.get(`${this.apiUrl}/search/movie`, {params});
      }
      if(searchParams.startDate){
        // params = params.set('primary_release_date.gte', searchParams.startDate).set('primary_release_date.lte', searchParams.endDate);
        params = params.set('primary_release_date.gte', searchParams.startDate);
      }
      if( searchParams.endDate){
        params = params.set('primary_release_date.lte', searchParams.endDate);
      }
    }
    // return this.http.get(`${this.apiUrl}/movie/now_playing`, {params});
    return this.http.get(`${this.apiUrl}/discover/movie`, { params });
  }

  getPopularMovies(page: number=1, searchParams?:any): Observable<any> {
    //discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200'
    let params = new HttpParams().set('api_key', this.apiKey)
                              .set('include_adult', false)
                              .set('include_video', false)
                              .set('language', 'en-US')
                              .set('page', page.toString())
                              .set('sort_by', 'vote_average.desc') //
                              .set('without_genres','99,10755')
                              .set('vote_count.gte', '200')
                              .set('release_date.gte', '{min_date}')
                              .set('release_date.lte', '{max_date}');

    if(searchParams){
      if(searchParams.query){
        params = params.set('query', searchParams.query);
        return this.http.get(`${this.apiUrl}/search/movie`, {params});
      }
      if(searchParams.startDate){
        params = params.set('primary_release_date.gte', searchParams.startDate);
      }
      if(searchParams.endDate){
        params = params.set('primary_release_date.lte', searchParams.endDate);
      }
    }

    // return this.http.get(`${this.apiUrl}/movie/popular?api_key=${this.apiKey}&page=${page}`);
    return this.http.get(`${this.apiUrl}/discover/movie`, {params});
  }

  //get movie details
  getMovieDetails(movieId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${movieId}?api_key=${this.apiKey}`);
  }
  // get movie credits
  getMovieCredits(movieId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${movieId}/credits?api_key=${this.apiKey}`);
  }
  //get related movies
  getRelatedMovies(movieId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${movieId}/similar?api_key=${this.apiKey}`);
  }

  // method post, vote Movie
  voteMovie(movieId: number, value: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/movie/${movieId}/rating?api_key=${this.apiKey}`, { value });
  }

// #########################
// ## autentication
// #################
  // getRequestToken(): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/authentication/token/new`, {
  //     params: new HttpParams().set('api_key', this.apiKey)
  //   });
  // }

  // createSession(requestToken: string): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/authentication/session/new`, {
  //     request_token: requestToken
  //   }, {
  //     params: new HttpParams().set('api_key', this.apiKey)
  //   });
  // }

  // setSessionId(sessionId: string): void {
  //   this.sessionId = sessionId;
  //   localStorage.setItem('sessionId', sessionId);
  // }

  // getSessionId(): string | null {
  //   return this.sessionId;
  // }

}
