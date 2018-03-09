import { Component, Input , OnInit} from '@angular/core';
import { Question, Response } from '../../../../models';
import { AuthService } from '../../../../services/auth.service';
import { ResponseService } from '../../../../services/response.service';
import {PercentageService} from '../../../../services/percentage.service';
import {AbstractInputComponent} from '../abstract-input/abstract-input.component';
import {NotifyService} from '../../../../services/notify.service';

@Component({
  selector: 'app-multiple',
  templateUrl: './multiple.component.html',
  styleUrls: ['./multiple.component.scss']
})
export class MultipleComponent extends AbstractInputComponent implements OnInit {

  @Input() question: Question;
  @Input() response: Response;
  textErrorEmpty= 'Erreur reponse est vide!';
  isTextErrorEmptyHidden= true;
  questionText: string;
  questions: string[];
  constructor(responseService: ResponseService,
              private authService: AuthService,
              percentageService: PercentageService,
              notif: NotifyService ) {
    super(responseService, percentageService, notif);
  }

  ngOnInit() {
    this.questionText = this.question.question.split(';')[0];
    this.questions = this.question.question.split(';')[1].split('/');
  }

  /* DOM events */
  getBackgroundImage() {
    return 'url(\'/assets/img/planets/zoom/surface-planet-' + this.question.category_id + '.png\')';
  }

  onSubmit() {
    if (!this.response.response) {
      this.isTextErrorEmptyHidden = false;
    } else {
      this.isTextErrorEmptyHidden = true;
      this.response.question_id = this.question.id;
      this.response.user_id = this.authService.getCurrentUser().id;
      this.percentageService.calculatePercentage();
      if (!this.response.id) {
        this.saveResponse(this.response, false);
      } else {
        this.updateResponse(this.response, this.question.id, false);
      }
    }
  }


}
