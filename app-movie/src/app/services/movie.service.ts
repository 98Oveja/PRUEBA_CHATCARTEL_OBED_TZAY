import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = '25adcd44887b4ce3d640721e22c185ef';

  constructor(private http: HttpClient) {}

  getNowPlaying(page: number=1, searchParams?: any): Observable<any> {

    let params = new HttpParams().set('api_key', this.apiKey).set('page', page.toString());

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

    // return this.http.get(`${this.apiUrl}/movie/now_playing?api_key=${this.apiKey}&page=${page}`);
    // return this.http.get(`${this.apiUrl}/movie/now_playing`, {params});
    return this.http.get(`${this.apiUrl}/discover/movie`, { params });
  }

  getPopularMovies(page: number=1): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/popular?api_key=${this.apiKey}&page=${page}`);
  }

  getMovieDetails(movieId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${movieId}?api_key=${this.apiKey}`);
  }
}
