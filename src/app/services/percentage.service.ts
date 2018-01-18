import { Injectable } from '@angular/core';
import {QuestionsService} from './questions.service';
import {ResponseService} from './response.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class PercentageService {


  private subject = new BehaviorSubject<any>(0);
  public observable = this.subject.asObservable();

  constructor(private questionsService: QuestionsService, private responseService: ResponseService) {
  }

  calculatePercentage() {
    const context = this;
      context.questionsService.getAll().then((questions) => {
        context.responseService.getAll().then((response) => {
          const percentage = (Math.floor((response.json().length * 100) / questions.json().length));
          this.subject.next(percentage);
        });
      });


  }


}
