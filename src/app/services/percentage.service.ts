import { Injectable } from '@angular/core';
import {QuestionsService} from './questions.service';
import {ResponseService} from './response.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AuthService} from './auth.service';
import {Response} from '../models/response';



@Injectable()
export class PercentageService {


  private subject = new BehaviorSubject<any>(0);
  public observable = this.subject.asObservable();

  constructor(private questionsService: QuestionsService,
              private responseService: ResponseService,
              private authService: AuthService) {
  }

  calculatePercentage() {
    const context = this;
      context.questionsService.getAllQuestionsByAgency(this.authService.getCurrentUser().agence_id).then((questions) => {
        context.responseService.getAll().then((response) => {
        
          let compteurReponse:number=0;
          for (let i = 0; i < response.json().length ; i++) {
            if(response.json()[i].valide==true){
              compteurReponse+=1;
            }
            else{
              compteurReponse+=0.5;
            }
          }
           const percentage = (Math.round((compteurReponse* 100) / questions.json().length).toFixed(1));
          this.subject.next(percentage);
        });
      });


  }


}
