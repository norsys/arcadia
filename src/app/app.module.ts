import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { Routing } from './app.routes';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './components/game/home/home.component';
import { EnsureAuthenticated } from './services/ensure-authenticated.service';
import { LoginRedirect } from './services/login-redirect.service';
import { HeaderComponent } from './components/game/header/header.component';
import { ShipComponent } from './components/game/ship/ship.component';
import { AuthComponent } from './components/auth/auth.component';
import { PlanetsComponent } from './components/game/planets/planets.component';
import { CameraComponent } from './components/game/input/camera/camera.component';
import { QuestionsComponent } from './components/game/questions/questions.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    HeaderComponent,
    ShipComponent,
    AuthComponent,
    PlanetsComponent,
    CameraComponent,
    QuestionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Routing
  ],
  providers: [AuthService, LoginRedirect, EnsureAuthenticated],
  bootstrap: [AppComponent]
})
export class AppModule { }
