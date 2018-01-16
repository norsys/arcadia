import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AuthService } from './auth.service';

@Injectable()
export class QuestionsService {

  constructor(private http: Http, private auth: AuthService) { }

  find(questionId): Promise<any> {
    return this.http.get('/v1/questions/' + questionId, this.auth.getOptions()).toPromise();
  }

  getAll(): Promise<any> {
    return this.http.get('/v1/questions', this.auth.getOptions()).toPromise();
  }

}
