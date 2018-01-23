import { Component, Input , OnInit} from '@angular/core';
import { Question, Response } from '../../../../models';
import { AuthService } from '../../../../services/auth.service';
import { ResponseService } from '../../../../services/response.service';
import {PercentageService} from '../../../../services/percentage.service';
import {AbstractInputComponent} from '../abstract-input/abstract-input.component';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent extends AbstractInputComponent implements OnInit {


  @Input() question: Question;
  @Input() response: Response;


  constructor(private authService: AuthService,
               responseService: ResponseService,
               percentageService: PercentageService) {
    super(responseService, percentageService);
  }

  ngOnInit() {
  }

  /* DOM events*/
  getBackgroundImage() {
    return 'url(\'/assets/img/planets/zoom/surface-planet-' + this.question.category_id + '.png\')';
  }

  onSubmit() {
    this.response.question_id = this.question.id;
    this.response.user_id = this.authService.getCurrentUser().id;
    this.percentageService.calculatePercentage();
    this.isTextErrorSubmissionHidden = true;
    if (!this.response.id) {
      this.saveResponse(this.response, true);
    }else {
      this.updateResponse(this.response, this.question.id, true);
    }
  }


}
