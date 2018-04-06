import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/game/home/home.component';
import { ProfilComponent } from './components/game/profil/profil.component';
import { PlanetsComponent } from './components/game/planets/planets.component';
import { EnsureAuthenticated } from './services/ensure-authenticated.service';
import { LoginRedirect } from './services/login-redirect.service';
import { QuestionsComponent } from './components/game/questions/questions.component'
import {ResumeComponent} from './components/game/resume/resume.component';
import {AideComponent} from './components/game/aide/aide.component';
import { ResetpasswordComponent } from './components/auth/resetpassword/resetpassword.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login', component: AuthComponent, canActivate: [LoginRedirect] },
  { path: 'reset', component: ResetpasswordComponent, canActivate: [LoginRedirect] },
  { path: 'home', component: HomeComponent, canActivate: [EnsureAuthenticated] },
  { path: 'profil', component: ProfilComponent, canActivate: [EnsureAuthenticated] },
  { path: 'resume', component: ResumeComponent, canActivate: [EnsureAuthenticated] },
  { path: 'planets/:categoryId', component: PlanetsComponent, canActivate: [EnsureAuthenticated] },
  { path: 'planets/:categoryId/questions/:questionId', component: QuestionsComponent, canActivate: [EnsureAuthenticated] },
  { path: 'aide', component: AideComponent, canActivate: [EnsureAuthenticated] }

];

export const Routing = RouterModule.forRoot(routes);
