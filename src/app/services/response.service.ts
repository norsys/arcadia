import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AuthService } from './auth.service'

@Injectable()
export class ResponseService {

  constructor(private http: Http, private auth: AuthService) { }


  getAll(): Promise<any> {
    return this.http.get('/v1/users/' + this.auth.getCurrentUser().id + '/responses', { params: { accessToken: this.auth.getCurrentUser().accessToken } }).toPromise();
  }

  getResponseByUserByQuestion(questionId): Promise<any> {
    return this.http.get('/v1/users/' + this.auth.getCurrentUser().id + '/responses/' + questionId, { params: { accessToken: this.auth.getCurrentUser().accessToken } }).toPromise();
  }

  getAllResponseByUser(): Promise<any> {
    return this.http.get('/v1/users/' + this.auth.getCurrentUser().id + '/responses', { params: { accessToken: this.auth.getCurrentUser().accessToken } }).toPromise();
  }
  
  save(response): Promise<any> {
    return this.http.post('/v1/users/' + this.auth.getCurrentUser().id + '/responses', response, { params: { accessToken: this.auth.getCurrentUser().accessToken } }).toPromise();
  }

}
