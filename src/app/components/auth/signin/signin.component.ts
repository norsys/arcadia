import { Component, OnInit } from '@angular/core';
import { Alien } from '../../../models/index';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  private alien: Alien = new Alien();
  private submitted: boolean = false;

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

  ngOnInit() {
  }

}
