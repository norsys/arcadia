import { Component, Input , OnInit} from '@angular/core';
import { Question, Response } from '../../../../models';
import { AuthService } from '../../../../services/auth.service';
import { ResponseService } from '../../../../services/response.service';
import {PercentageService} from '../../../../services/percentage.service';
import {AbstractInputComponent} from '../abstract-input/abstract-input.component';
import {NotifyService} from '../../../../services/notify.service';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent extends AbstractInputComponent implements OnInit {


  @Input() question: Question;
  @Input() response: Response;
  textErrorEmpty= 'Erreur reponse est vide!';
  isTextErrorEmptyHidden= true;
  constructor(private authService: AuthService,
               responseService: ResponseService,
               percentageService: PercentageService,
               notif: NotifyService) {
    super(responseService, percentageService, notif);
  }

  ngOnInit() {
  }

  /* DOM events*/
  getBackgroundImage() {
    return 'url(\'/assets/img/planets/zoom/surface-planet-' + this.question.category_id + '.png\')';
  }

  onSubmit() {
    if (!this.response.response) {
      this.isTextErrorEmptyHidden = false;
    } else {
    this.response.question_id = this.question.id;
    this.response.user_id = this.authService.getCurrentUser().id;
    this.percentageService.calculatePercentage();
    this.isTextErrorSubmissionHidden = true;
    this.isTextErrorEmptyHidden = true;
    if (!this.response.id) {
      this.saveResponse(this.response, true);
    }else {
      this.updateResponse(this.response, this.question.id, true);
    }
    }
  }
}
