import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { MapComponent } from './map/map.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'reviews', component: ReviewsComponent, canActivate: [AuthGuard]},
  {path: 'map', component: MapComponent, canActivate: [AuthGuard]}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [LoginComponent, DashboardComponent, ReviewsComponent, MapComponent];
