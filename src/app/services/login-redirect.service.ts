import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class LoginRedirect implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }
  canActivate(): boolean {
    if (localStorage.getItem('user_arcadia') && JSON.parse(localStorage.getItem('user_arcadia')).accessToken) {
      this.router.navigateByUrl('/home');
      return false;
    }
    else {
      return true;
    }
  }
}