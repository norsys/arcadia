import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Alien } from '../models';
@Injectable()
export class AuthService {

  constructor(private http: Http) { }


  login(alien): Promise<any> {
    return this.http.post('/v1/auth', alien).toPromise();
  }

  logout(): Promise<any> {
    return this.http.delete('/v1/auth', { params: { accessToken: this.getCurrentUser().accessToken } }).toPromise();
  }

  register(alien): Promise<any> {
    return this.http.post('/v1/users', alien).toPromise();
  }
  getCurrentUser(): Alien {
    return JSON.parse(localStorage.getItem('user_arcadia')).user;
  }
}
