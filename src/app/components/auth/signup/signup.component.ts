import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  public alien: Alien = new Alien();
  public agencies: Array<Agency>;

  public avatars: Array<String> = [
    'avatar-1',
    'avatar-2',
    'avatar-3',
    'avatar-5',
    'avatar-6',
    'avatar-7',
  ]
  @Input() swipeValue: boolean = false;


  @Output() onSwipe = new EventEmitter<boolean>();

  constructor(private auth: AuthService, private agenciesService: AgenciesService, private router: Router) { }
  onSubmit() {
    this.auth.register(this.alien)
      .then((user) => {
        this.onSwipe.emit(!this.swipeValue);
        this.router.navigate(['/']);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  swip() {
    this.onSwipe.emit(!this.swipeValue);
  }

  selectAvatar(avatar: string) {
    this.alien.avatar = avatar;
  }
  isSelected(avatar: string) {
    return this.alien.avatar === avatar;
  }
  ngOnInit() {
    this.agenciesService.findAll().subscribe(
      result => {
        this.agencies = result;
      });
  }
}
