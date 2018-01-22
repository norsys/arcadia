import { Component, Input , OnInit} from '@angular/core';
import { Question, Response } from '../../../../models';


import { AuthService } from '../../../../services/auth.service';
import { ResponseService } from '../../../../services/response.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import {PercentageService} from '../../../../services/percentage.service';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {


  @Input() question: Question;
  @Input() response: Response;
  errorSubmission;
  isErrorSubmissionHidden = true;

  constructor(private authService: AuthService,
              private responseService: ResponseService,
              private percentageService: PercentageService,
              private router: Router,
              private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
  }

  getBackgroundImage() {
    return 'url(\'/assets/img/planets/zoom/surface-planet-' + this.question.category_id + '.png\')';
  }

  onSubmit() {
    this.response.question_id = this.question.id;
    this.response.user_id = this.authService.getCurrentUser().id;
    this.percentageService.calculatePercentage();
    this.isErrorSubmissionHidden = true;
    if (this.response.id == null) {
      this.saveResponse(this.response);
    }else {
      this.updateResponse(this.response, this.question.id);
    }
  }

  private updateResponse(response: Response, questionId) {
    this.responseService.update(response, questionId).then((body) => {
      window.history.back();
    }).catch((error) => {
      const errors = JSON.parse(error._body);
      this.errorSubmission = '!!! ' + errors[0]['message']['en'];
      this.isErrorSubmissionHidden = false;
    });
  }

  private saveResponse(response: Response) {
    this.responseService.save(response).then((body) => {
      window.history.back();
    }).catch((error) => {
      const errors = JSON.parse(error._body);
      this.errorSubmission = '!!! ' + errors[0]['message']['en'];
      this.isErrorSubmissionHidden = false;
    });
  }
}
