import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ImagesService {

  constructor(private http: Http, private auth: AuthService) { }

  /* CRUD */
  save(name, image): Promise<any> {
    return this.http.post('/v1/images', { 'name': name, 'image': image }, this.auth.getOptions()).toPromise();
  }

  /*others*/
  getImage(name): Promise<any> {
    return this.http.get('/v1/images/' + name, this.auth.getOptionsForBlob()).toPromise();
  }

}
