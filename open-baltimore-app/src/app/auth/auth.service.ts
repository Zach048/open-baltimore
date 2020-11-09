import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Sets 'isLoggedOut' to false and removes user's token from local storage
  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('user');
  }
}
