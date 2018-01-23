import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import * as Hammer from 'hammerjs';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

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
import { DisplayService } from './services/display.service';
import { TextComponent } from './components/game/input/text/text.component';
import { BooleanComponent } from './components/game/input/boolean/boolean.component';
import { ProfilComponent } from './components/game/profil/profil.component';
import { ResumeComponent } from './components/game/resume/resume.component';
import { HttpClientModule} from '@angular/common/http';
import {QuestionsService} from './services/questions.service';
import {ResponseService} from './services/response.service';
import {PercentageService} from './services/percentage.service';

export class HammerConfig extends HammerGestureConfig {
  overrides = <any>{
    'swipe': { direction: Hammer.DIRECTION_ALL }
  };
}

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
    QuestionsComponent,
    TextComponent,
    BooleanComponent,
    ProfilComponent,
    ResumeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    Routing
  ],
  providers: [AuthService, PercentageService, QuestionsService, ResponseService, LoginRedirect, EnsureAuthenticated, DisplayService,
    {
    provide: HAMMER_GESTURE_CONFIG,
    useClass: HammerConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
