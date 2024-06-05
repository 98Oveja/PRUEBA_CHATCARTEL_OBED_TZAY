import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = '25adcd44887b4ce3d640721e22c185ef';

  constructor(private http: HttpClient, private router: Router) {}

  createRequestToken() {
    return this.http.get(`${this.apiUrl}/authentication/token/new`, {
      params: new HttpParams().set('api_key', this.apiKey)
    });
  }

  validateUser(requestToken: string, username: string, password: string) {
    return this.http.post(`${this.apiUrl}/authentication/token/validate_with_login`, {
      username,
      password,
      request_token: requestToken
    }, {
      params: new HttpParams().set('api_key', this.apiKey)
    });
  }

  createSession(requestToken: string) {
    return this.http.post(`${this.apiUrl}/authentication/session/new`, {
      request_token: requestToken
    }, {
      params: new HttpParams().set('api_key', this.apiKey)
    });
  }

  login(username: string, password: string) {
    this.createRequestToken().subscribe((tokenData: any) => {
      const requestToken = tokenData.request_token;
      this.validateUser(requestToken, username, password).subscribe(() => {
        this.createSession(requestToken).subscribe((sessionData: any) => {
          localStorage.setItem('session_id', sessionData.session_id);
          this.router.navigate(['/now-playing']);
        }, error =>{
          console.error('Error creating session:', error);
        });
      }, error =>{
        console.error('Error validating user:', error);
      });
    },error =>{
      console.error('Error creating request token:', error);
    });
  }

  logout() {
    localStorage.removeItem('session_id');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('session_id');
  }
}
