import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Alien } from '../../../models/index';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  public alien: Alien = new Alien();
  public error = '';
  @Input() swipeValue = false;

  @Output() onSwipe = new EventEmitter<boolean>();

  constructor(private auth: AuthService,
    private router: Router) { }

    /*DOM events*/
  onSubmit() {
    this.auth.login(this.alien)
      .then((alien) => {
        this.auth.setAlienInLocalStorage(alien.json().user);
        this.router.navigate(['/home']);
        this.error = 'Hello '.concat(alien.json().nickname).concat(' !');
      })
      .catch((err) => {
        this.error = 'Problem during authentication. Check your connection';
      });
  }

  displayLogin() {
    return this.swipeValue;
  }

  swip() {
    this.onSwipe.emit(!this.swipeValue);
  }

}
