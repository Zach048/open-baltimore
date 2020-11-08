import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'open-baltimore';
  constructor( private route: ActivatedRoute, private router: Router, private logout: LoginComponent) {
  }

  signOut(): void{
    this.logout.signOut();
  }

}
