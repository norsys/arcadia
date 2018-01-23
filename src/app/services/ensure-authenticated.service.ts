import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class EnsureAuthenticated implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }
  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      const currentUser = JSON.parse(localStorage.getItem('user_arcadia'));
      if (currentUser === null) {
         this.router.navigateByUrl('/');
         resolve(false);
       }
      return this.auth.isAuth(currentUser['id']).then(() => { resolve(true); }).catch(() => {
        localStorage.removeItem('user_arcadia');
        this.router.navigateByUrl('/');
        resolve(false);
      });
    });

  }
}
