import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Question } from '../../../models'
import { QuestionsService } from '../../../services/questions.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  providers: [QuestionsService]
})
export class QuestionsComponent {

  public question: Question;
  public inputType: string;
  constructor(private route: ActivatedRoute, private router: Router, private questionsService: QuestionsService) {
    this.route.params.subscribe(params => {
      this.questionsService.find(params['questionId'])
        .then((response) => {
          this.question = response.json()
          this.inputType = this.question.inputType;
        });
    });
  }

}
