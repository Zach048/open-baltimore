import { Component, NgZone, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements AfterViewInit {
  public auth2: any;
  constructor( private route: ActivatedRoute, private router: Router, private ngZone: NgZone, private authService: AuthService) {
  }


  public googleInit(): any {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '544259183679-ijbi8vh8sv4aneo5sqqe5pirhpn57ko7.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }
  public attachSignin(element: any): any {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {

        const profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        // set email address as username
        localStorage.setItem('user', profile.getEmail());
        // set login flag for auth guard
        localStorage.setItem('isLoggedIn', 'true');
        // Must use NgZone so UI can update properly
        this.ngZone.run(() => {
          this.router.navigate(['../dashboard']);
        });

      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  signOut(): void {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      console.log('User signed out.');
      this.authService.logout();
      this.router.navigate(['/']);

    });
  }

  ngAfterViewInit(): void{
        this.googleInit();
  }
}
