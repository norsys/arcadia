import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AuthService } from '../services/auth.service';
@Injectable()
export class GameService {

  constructor(private http: Http, private auth: AuthService) { }


  startGame(alien): Promise<any> {
    alien.gameIsStarted = true;
    alien.startedDate = new Date().toString();
    return this.http.put('/v1/users/' + alien.id, alien, { params: { accessToken: this.auth.getCurrentUser().accessToken } }).toPromise();
  }

}
