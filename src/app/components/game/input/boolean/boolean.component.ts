import { Component, Input , OnInit} from '@angular/core';
import { Question, Response } from '../../../../models';
import { AuthService } from '../../../../services/auth.service';
import { ResponseService } from '../../../../services/response.service';
import {PercentageService} from '../../../../services/percentage.service';
import {AbstractInputComponent} from '../abstract-input/abstract-input.component';

@Component({
  selector: 'app-boolean',
  templateUrl: './boolean.component.html',
  styleUrls: ['./boolean.component.scss']
})
export class BooleanComponent extends AbstractInputComponent implements OnInit {

  @Input() question: Question;
  @Input() response: Response;

  constructor(responseService: ResponseService,
              private authService: AuthService,
              percentageService: PercentageService) {
    super(responseService, percentageService);
  }

  ngOnInit() {
  }

  /* DOM events */
  getBackgroundImage() {
    return 'url(\'/assets/img/planets/zoom/surface-planet-' + this.question.category_id + '.png\')';
  }

  onSubmit() {
    this.response.question_id = this.question.id;
    this.response.user_id = this.authService.getCurrentUser().id;
    this.percentageService.calculatePercentage();
    if (!this.response.id) {
      this.saveResponse(this.response, false);
    }else {
      this.updateResponse(this.response, this.question.id, false);
    }
  }


}
