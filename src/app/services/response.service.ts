import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AuthService } from './auth.service';

@Injectable()
export class ResponseService {

  constructor(private http: Http, private auth: AuthService) { }


  getAll(): Promise<any> {
    return this.http.get('/v1/users/' + this.auth.getCurrentUser().id + '/responses', this.auth.getOptions()).toPromise();
  }

  getResponseByUserByQuestion(questionId): Promise<any> {
    return this.http.get('/v1/users/' + this.auth.getCurrentUser().id + '/responses/' + questionId, this.auth.getOptions()).toPromise();
  }

  getAllResponseByUser(): Promise<any> {
    return this.http.get('/v1/users/' + this.auth.getCurrentUser().id + '/responses', this.auth.getOptions()).toPromise();
  }

  save(response): Promise<any> {
    return this.http.post('/v1/users/' + this.auth.getCurrentUser().id + '/responses', response, this.auth.getOptions()).toPromise();
  }
}
