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
  public submitted: boolean = false;

  @Input() swipeValue: boolean = false;

  @Output() onSwipe = new EventEmitter<boolean>();

  constructor(private auth: AuthService, private router: Router) { }

  onSubmit() {
    this.submitted = true;
    this.auth.login(this.alien)
      .then((alien) => {
        console.log(alien.json());
        localStorage.setItem('user_arcadia', JSON.stringify(alien.json()));
        this.router.navigate(['/home']);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  displayLogin() {
    return this.swipeValue;
  }
  swip() {
    this.onSwipe.emit(!this.swipeValue);
  }

}
