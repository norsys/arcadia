import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Alien } from '../models';
@Injectable()
export class AuthService {

  constructor(private http: Http) { }


  login(alien): Promise<any> {
    return this.http.post('/v1/auth', alien, { params: { apiKey: environment.apiKey } }).toPromise();
  }

  logout(): Promise<any> {
    return this.http.delete('/v1/auth', { params: { accessToken: this.getCurrentUser().accessToken, apiKey: environment.apiKey } }).toPromise();
  }
  updateUser(alien): Promise<any> {
    return this.http.put('/v1/users/' + alien.id, alien, { params: { accessToken: this.getCurrentUser().accessToken } }).toPromise();
  }
  register(alien): Promise<any> {
    return this.http.post('/v1/users', alien).toPromise();
  }
  setAlienInLocalStorage(alien) {
    localStorage.setItem('user_arcadia', JSON.stringify(alien));
  }
  getCurrentUser(): Alien {
    if (localStorage.getItem('user_arcadia')) {
      return JSON.parse(localStorage.getItem('user_arcadia'));
    }
    return null;
  }

  isAuth(idAlien) {
    return this.http.get('/v1/users/' + idAlien, { params: { accessToken: this.getCurrentUser().accessToken } }).toPromise();
  }
}
