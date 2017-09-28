import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomeComponent } from './components/game/home/home.component';
import { EnsureAuthenticated } from './services/ensure-authenticated.service';
import { LoginRedirect } from './services/login-redirect.service';

export const routes: Routes = [
  { path: '', component: SigninComponent, canActivate: [LoginRedirect] },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent, canActivate: [EnsureAuthenticated] }
];

export const Routing = RouterModule.forRoot(routes);