import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question, Response } from '../../../models';
import { QuestionsService } from '../../../services/questions.service';
import { ResponseService } from '../../../services/response.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  providers: [QuestionsService, ResponseService]
})
export class QuestionsComponent {

  public question: Question;
  public response: Response;
  public inputType: string;

  constructor(private route: ActivatedRoute, private questionsService: QuestionsService, private responseService: ResponseService) {
    this.route.params.subscribe(params => {
      this.questionsService.find(params['questionId'])
        .then((response) => {
          this.question = response.json();
          this.inputType = this.question.inputType;
        });
      this.responseService.getResponseByUserByQuestion(params['questionId'])
        .then((body) => {
          this.response = body.json();
        }).catch((body) => {
          if (body.status === 404) {
            this.response = new Response();
          }
        });
    });
  }

}
