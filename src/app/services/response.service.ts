import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AuthService } from './auth.service'

@Injectable()
export class ResponseService {

  constructor(private http: Http, private auth: AuthService) { }


  getAll(): Promise<any> {
    return this.http.get('/v1/responses', { params: { accessToken: this.auth.getCurrentUser().accessToken } }).toPromise();
  }

}
