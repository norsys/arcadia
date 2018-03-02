import {Component, Input, Output, EventEmitter} from '@angular/core';
import { Alien } from '../../../models/index';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import {DisplayService} from '../../../services/display.service';
import {Config} from '../../../config/config';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {

  public alien: Alien = new Alien();
  public error = '';
  @Input() swipeValue = false;

  @Output() onSwipe = new EventEmitter<boolean>();

  constructor(private auth: AuthService,
              private displayService: DisplayService,
              private router: Router) { }

  /*DOM events*/
  onSubmit() {
    this.alien.email = this.alien.email.toLowerCase();
    this.auth.login(this.alien)
      .then((alien) => {
        this.auth.setAlienInLocalStorage(alien.json().user);
        this.displayService.setShowHeader(true);
        this.router.navigate(['/home']);
        this.error = 'Bienvenue '.concat(alien.json().nickname).concat(' !');
      })
      .catch((err) => {
        this.handleErrorLogin(err);
      });
  }

  private handleErrorLogin(err) {
    const errorCode = err.json()[0].errorCode;
    if (errorCode === 'Unauthorized') {
      this.error = 'Les données que vous avez entré sont incorrects';
      setTimeout(() => {this.error = '';}, 4000);
    } else {
      const errors = JSON.parse(err._body);
      this.error = errors[0]['message'][Config.getSelectedErrorsLanguage()];
      setTimeout(() => {this.error = '';}, 4000);
    }
  }

  displayLogin() {
    return this.swipeValue;
  }

  swip() {
    var btnclick = document.querySelector('#SingIn-animat').classList;
    btnclick.add('SingIn-animat');
    this.onSwipe.emit(!this.swipeValue);
    setTimeout(() => {
      btnclick.remove('SingIn-animat');
    }, 1000);
  }

}
