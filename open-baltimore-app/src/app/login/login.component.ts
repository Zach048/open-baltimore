import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public auth2: any;
  ngZone: any;
  constructor( private route: ActivatedRoute, private router: Router) {
  }

  // tslint:disable-next-line: typedef
  ngOnInit() {
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
        // YOUR CODE HERE
        console.log('pushed');


      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

// tslint:disable-next-line: use-lifecycle-interface
// tslint:disable-next-line: typedef
  ngAfterViewInit(){
        this.googleInit();
        // this.ngZone.run(() => {
        //   this.router.navigate(['../dashboard']);
        // });
  }
}
