import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AuthService } from './auth.service';

@Injectable()
export class CategoryService {

  constructor(private http: Http, private auth: AuthService) { }

  /* CRUD */
  getAll(): Promise<any> {
    return this.http.get('/v1/categories', this.auth.getOptions()).toPromise();
  }

  /*others*/
  getById(categoryId): Promise<any> {
    return this.http.get('/v1/categories/' + categoryId, this.auth.getOptions()).toPromise();
  }

}
