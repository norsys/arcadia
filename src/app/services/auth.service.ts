import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {Headers, Http, RequestOptions, ResponseContentType} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Alien} from '../models/alien';

@Injectable()
export class AuthService {



  constructor(private http: Http) {}

  /*login logout methods*/
  login(alien): Promise<any> {
    return this.http.post('/v1/auth', alien, { params: { apiKey: environment.apiKey } }).toPromise();
  }

  logout(): Promise<any> {
    return this.http.delete('/v1/auth', { params: { accessToken: this.getCurrentUser().accessToken, apiKey: environment.apiKey } }).toPromise();
  }

  /* CRUD */
  register(alien): Promise<any> {
    return this.http.post('/v1/users', alien).toPromise();
  }

  updateUser(alien): Promise<any> {
    return this.http.put('/v1/users/' + alien.id, alien, this.getOptions()).toPromise();
  }

  /* functions to add options to header requests */
   getOptions() {
    const headers = new Headers({'Authorization': 'Bearer ' + this.getCurrentUser().accessToken});
    const options = new RequestOptions({
      headers: headers
    });
    return options;
  }

  getOptionsForBlob() {
    const headers = new Headers({'Authorization': 'Bearer ' + this.getCurrentUser().accessToken});
    const options = new RequestOptions({
      headers: headers,
      responseType: ResponseContentType.Blob
    });
    return options;
  }

  /*others*/
  setAlienInLocalStorage(alien) {
    localStorage.setItem('user_arcadia', JSON.stringify(alien));
  }

  isAuth(idAlien) {
    return this.http.get('/v1/users/' + idAlien, this.getOptions()).toPromise();
  }

  getCurrentUser(): Alien {
    if (localStorage.getItem('user_arcadia')) {
      return JSON.parse(localStorage.getItem('user_arcadia'));
    }
    return null;
  }
}
