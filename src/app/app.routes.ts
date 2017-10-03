import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/game/home/home.component';
import { PlanetsComponent } from './components/game/planets/planets.component';
import { EnsureAuthenticated } from './services/ensure-authenticated.service';
import { LoginRedirect } from './services/login-redirect.service';

export const routes: Routes = [
  { path: '', component: AuthComponent, canActivate: [LoginRedirect] },
  { path: 'home', component: HomeComponent, canActivate: [EnsureAuthenticated] },
  { path: 'planets/:name', component: PlanetsComponent, canActivate: [EnsureAuthenticated] }
  
];

export const Routing = RouterModule.forRoot(routes);