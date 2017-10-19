import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ImagesService {

  constructor(private http: Http, private auth: AuthService) { }

  getImage(name): string {
    return '/v1/images/' + name+'?accessToken='+this.auth.getCurrentUser().accessToken;
  }
  save(name, image): Promise<any> {
    return this.http.post('/v1/images', { 'name': name, 'image': image }, { params: { accessToken: this.auth.getCurrentUser().accessToken } }).toPromise();
  }
}
