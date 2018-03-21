import { Injectable } from '@angular/core';
import {NotificationsService} from 'angular2-notifications';
import {PercentageService} from './percentage.service';
import {Alien} from '../models';

@Injectable()
export class NotifyService {

  percentage: Number;
  percent: Boolean;
  constructor(private notif: NotificationsService,
              private percentageService: PercentageService) { }

 verifierPourcentage() {
      this.percentageService.calculatePercentage();
      this.percentageService.observable.subscribe(percentageResult => {
        this.percentage = percentageResult;
        if (this.percentage === 100) {
          this.percent = true;
        }
      });
      if (this.percent) {
        this.notif.info(
          'Wonderful',
          'Tu as repondu à toutes les questions',
          {
            timeOut: 5000,
            showProgressBar: false,
            pauseOnHover: false,
            clickToClose: false,
            maxLength: 100
          }
        );
      }else {
      this.notif.success(
        'Bravo',
        'Tu as réussi le défi !',
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
}
