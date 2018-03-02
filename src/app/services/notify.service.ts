import { Injectable } from '@angular/core';
import {NotificationsService} from 'angular2-notifications';

@Injectable()
export class NotifyService {

  constructor(private notif: NotificationsService) { }

  notifyWithSuccess() {
    this.notif.success(
      'Success',
      'Votre réponse est enregistrée avec succès',
      {
        timeOut: 2000,
        showProgressBar: false,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 50
      }
    );
  }
}
