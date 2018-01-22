import { Component, Input ,OnInit} from '@angular/core';
import { Question, Response } from '../../../../models';


import { AuthService } from '../../../../services/auth.service';
import { ResponseService } from '../../../../services/response.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import {PercentageService} from '../../../../services/percentage.service';

@Component({
  selector: 'app-boolean',
  templateUrl: './boolean.component.html',
  styleUrls: ['./boolean.component.scss']
})
export class BooleanComponent implements OnInit {

  @Input() question: Question;
  @Input() response: Response;

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
    return "url('/assets/img/planets/zoom/surface-planet-" + this.question.category_id + ".png')";
  }

  onSubmit() {
    this.response.question_id = this.question.id;
    this.response.user_id = this.authService.getCurrentUser().id;
    this.percentageService.calculatePercentage();
    if (this.response.id == null) {
      this.saveResponse(this.response);
    }else {
      this.updateResponse(this.response, this.question.id);
    }
  }

  private saveResponse(response: Response) {
    this.responseService.save(response).then((body) => {
      window.history.back();
    }).catch((r) => {
      console.log('errors' + r);
    });
  }

  private updateResponse(response: Response, questionId) {
    this.responseService.update(response, questionId).then((body) => {
      window.history.back();
    }).catch((r) => {
      console.log('errors' + r);
    });
  }
}
