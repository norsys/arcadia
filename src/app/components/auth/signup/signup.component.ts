import { Component, OnInit } from '@angular/core';
import { Alien } from '../../../models/index';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public alien: Alien = new Alien();

  constructor(private auth: AuthService, private router: Router) { }
  onSubmit() {
    this.auth.register(this.alien)
      .then((user) => {
        console.log(user.json());
        this.router.navigate(['/']);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ngOnInit() {
  }

}
