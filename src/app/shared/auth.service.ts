import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Configuration, SteamProfile } from 'pydt-shared';

@Injectable()
export class AuthService implements CanActivate {
  constructor(private router: Router, private config: Configuration) {
    this.config.apiKeys['Authorization'] = this.getToken();
  }

  store(token: string, profile: SteamProfile) {
    localStorage.setItem('token', token);
    localStorage.setItem('steamProfile', JSON.stringify(profile));
    this.config.apiKeys['Authorization'] = token;
  }

  getToken(): string {
    return (localStorage.getItem('token') || '').trim();
  }

  getSteamProfile(): SteamProfile {
    return JSON.parse((localStorage.getItem('steamProfile') || '{}').trim());
  }

  canActivate() {
    const isLoggedIn = !!this.getToken();

    if (isLoggedIn) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
