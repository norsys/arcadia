import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Alien, Agency } from '../../../models/index';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AgenciesService } from '../../../services/agencies.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [AgenciesService]
})
export class SignupComponent implements OnInit {

  /*add comment*/
  public alien: Alien = new Alien();
  public agencies: Array<Agency>;

  public avatars: Array<String> = [
    'avatar-1',
    'avatar-2',
    'avatar-3',
    'avatar-5',
    'avatar-6',
    'avatar-7',
  ];

  @Input() swipeValue = false;
  @Output() onSwipe = new EventEmitter<boolean>();

  public isUserAlreadyRegistred = false;

  constructor(private auth: AuthService, private agenciesService: AgenciesService, private router: Router) { }

  ngOnInit() {
    this.agenciesService.findAll().subscribe(
      result => {
        this.agencies = result;
      });
  }

  /*DOM events*/
  onSubmit(form) {
    this.setDefaultAvatar();
    this.alien.email = this.alien.email.toLowerCase();
    this.auth.register(this.alien)
      .then((user) => {
        this.onSwipe.emit(!this.swipeValue);
        this.router.navigate(['/']);
        this.resetSignUpForm(form);
      })
      .catch((err) => {
        this.handleRegistrationError(err);
      });
  }

  swip() {
    this.onSwipe.emit(!this.swipeValue);
  }

  selectAvatar(avatar: string) {
    this.alien.avatar = avatar;
  }

  /* booleans */
  isSelected(avatar: string) {
    return this.alien.avatar === avatar;
  }

  isSignUpFormValid(form) {

    return form.form.valid;
  }


  /* private methods */
  private handleRegistrationError(err) {
    this.isUserAlreadyRegistred = true;
    setTimeout(() => {
      this.isUserAlreadyRegistred = false;
    }, 5000);
  }

  private resetSignUpForm(form) {
    form.reset();
    this.alien.avatar = null;
  }

  private setDefaultAvatar() {
    if (!this.alien.avatar) {
      this.alien.avatar = 'avatar-1';
    }
  }
}
