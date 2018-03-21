import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AuthService } from './auth.service';

@Injectable()
export class QuestionsService {

  constructor(private http: Http, private auth: AuthService) { }

  /* CRUD */
  getAll(): Promise<any> {
    return this.http.get('/v1/questions', this.auth.getOptions()).toPromise();
  }

  /*others*/
  find(questionId): Promise<any> {
    return this.http.get('/v1/questions/' + questionId, this.auth.getOptions()).toPromise();
  }

  getAllByAgency(agencyId: string): Promise<any> {
    return this.http.get('/v1/questions/agency/' + agencyId, this.auth.getOptions()).toPromise();
  }
}
