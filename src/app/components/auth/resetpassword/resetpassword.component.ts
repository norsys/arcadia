import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Alien } from '../../../models/alien';
import { AuthService } from '../../../services/auth.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  @Input() swipeValue = false;
  public alien = new Alien();
  public error = '';
  public swipe = false;

  constructor(private router: Router, private auth: AuthService, private notif: NotificationsService) { }

  ngOnInit() {
  }

  displayResetPassword() {
    return this.swipeValue;
  }

  onSubmit() {
    this.auth.getUserByEmail(this.alien.email)
      .then((alien) => {
        this.alien = alien.json();
        this.alien.password = 'badouch';
        this.auth.updateUserPassword(this.alien)
          .then((user) => {
            this.notif.success(
              'Envoyé',
              'Ton nouveau mot de passe a été envoyé',
              {
                timeOut: 2000,
                showProgressBar: false,
                pauseOnHover: false,
                clickToClose: false,
                maxLength: 50
              }
            );
            this.router.navigate(['/']);
          }).catch((err) => {
            console.log('err ' + err);
          });
      })
      .catch((err) => {
        this.error = 'Cet email n\'existe pas ';
      });



  }

  swipsignin() {
    this.router.navigate(['/login']);
  }
}
