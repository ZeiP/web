import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class ApiService {
  baseUrl = process.env.API_URL;

  constructor (private http: Http) {}

  getLoginUrl() {
    return this.http.get(this.baseUrl + '/auth/steam')
      .map(res => {
        return res.json().redirectURL;
      });
  }

  validateSteamCredentials(queryString: string) {
    return this.http.get(this.baseUrl + '/auth/steam/validate' + queryString)
      .map(res => {
        const data = res.json();
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('steamProfile', JSON.stringify(data.user));
          return data;
        }

        throw data;
      });
  }

  getUserGames() {
    return this.http.get(this.baseUrl + '/user/games', this.getAuthHeaders())
      .map(res => {
        return res.json();
      });
  }

  getSteamProfile() {
    return JSON.parse(localStorage.getItem('steamProfile'));
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  getAuthHeaders() {
    let headers = new Headers();

    if (!this.isLoggedIn()) {
      throw new Error("Not Logged In!");
    }

    headers.append('Authorization', this.getToken());

    return { headers: headers };
  }

  private getToken() {
    return localStorage.getItem('token');
  }
}
