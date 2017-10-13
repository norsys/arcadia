import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/game/home/home.component';
import { PlanetsComponent } from './components/game/planets/planets.component';
import { EnsureAuthenticated } from './services/ensure-authenticated.service';
import { LoginRedirect } from './services/login-redirect.service';
import { QuestionsComponent } from './components/game/questions/questions.component'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login', component: AuthComponent, canActivate: [LoginRedirect] },
  { path: 'home', component: HomeComponent, canActivate: [EnsureAuthenticated] },
  { path: 'planets/:categoryId', component: PlanetsComponent, canActivate: [EnsureAuthenticated] },
  { path: 'questions/:questionId', component: QuestionsComponent, canActivate: [EnsureAuthenticated] }

];

export const Routing = RouterModule.forRoot(routes);