import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map'
import { Agency } from '../models';
import { Observable } from 'rxjs';

@Injectable()
export class AgenciesService {

  constructor(private http: Http) { }


  findAll(): Observable<Array<Agency>> {
    return this.http.get('/v1/agencies').map((response: Response) => response.json());
  }
}
