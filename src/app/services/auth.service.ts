import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  constructor(private http: Http) { }


  login(alien): Promise<any> {
    return this.http.post(environment.apiUri + '/auth', alien).toPromise();
  }

  register(alien): Promise<any> {
    return this.http.post(environment.apiUri + '/users', alien).toPromise();
  }
}
