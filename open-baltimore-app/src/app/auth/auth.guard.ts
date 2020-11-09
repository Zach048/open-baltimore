import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  // If the user is logged in the page will render, otherswise navigation will redirect to login page
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.isLoggedIn()) {
      return true;
    }
    else {
      this.router.navigate(['/']);
      return false;
    }
  }

  // If user is logged in returns true, false otherwise
  // The 'isLoggedIn' boolean is stored in local storage
  public isLoggedIn(): boolean {
    let status = false;
    if (localStorage.getItem('isLoggedIn') === 'true') {
      status = true;
    } else {
      status = false;
    }
    return status;
  }
}
