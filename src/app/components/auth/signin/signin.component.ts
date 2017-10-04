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
  public error: string = '';
  @Input() swipeValue: boolean = false;

  @Output() onSwipe = new EventEmitter<boolean>();

  constructor(private auth: AuthService, private router: Router) { }

  onSubmit() {
    this.auth.login(this.alien)
      .then((alien) => {
        localStorage.setItem('user_arcadia', JSON.stringify(alien.json()));
        this.router.navigate(['/home']);
        this.error = alien;
      })
      .catch((err) => {
        console.log(err);
        this.error = err;
      });
  }
  displayLogin() {
    return this.swipeValue;
  }
  swip() {
    this.onSwipe.emit(!this.swipeValue);
  }

}
