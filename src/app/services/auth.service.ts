import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  constructor(private http: Http) { }


  login(alien): Promise<any> {
    return this.http.post('/v1/auth', alien).toPromise();
  }

  register(alien): Promise<any> {
    return this.http.post('/v1/users', alien).toPromise();
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user_arcadia')).user;
  }
}
