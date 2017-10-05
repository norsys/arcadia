import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/game/home/home.component';
import { PlanetsComponent } from './components/game/planets/planets.component';
import { EnsureAuthenticated } from './services/ensure-authenticated.service';
import { LoginRedirect } from './services/login-redirect.service';
import { CameraComponent } from './components/game/input/camera/camera.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login', component: AuthComponent, canActivate: [LoginRedirect] },
  { path: 'home', component: HomeComponent, canActivate: [EnsureAuthenticated] },
  { path: 'planets/:name', component: PlanetsComponent, canActivate: [EnsureAuthenticated] },
  { path: 'input/:name/:id', component: CameraComponent, canActivate: [EnsureAuthenticated] }
  
];

export const Routing = RouterModule.forRoot(routes);