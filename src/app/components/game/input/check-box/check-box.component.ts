import { Component, Input , OnInit} from '@angular/core';
import { Question, Response } from '../../../../models';
import { AuthService } from '../../../../services/auth.service';
import { ResponseService } from '../../../../services/response.service';
import {PercentageService} from '../../../../services/percentage.service';
import {AbstractInputComponent} from '../abstract-input/abstract-input.component';
import {NotifyService} from '../../../../services/notify.service';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss']
})

  export class CheckBoxComponent extends AbstractInputComponent implements OnInit {

    @Input() question: Question;
    @Input() response: Response;
    textErrorEmpty= 'Erreur de la réponse est vide!';
    isTextErrorEmptyHidden= true;

    questionText: string;
    questions: string[];
    public options: Option[];

    get selectedOptions() {
      const selected =  this.options
        .filter(opt => opt.checked);
      let selectedString = '';
      selected.forEach(select => {
        selectedString += select.value + '/';
      });
      return selectedString.slice(0, -1);
    }

    constructor(responseService: ResponseService,
                private authService: AuthService,
                percentageService: PercentageService,
                notif: NotifyService) {
      super(responseService, percentageService, notif);
    }

  handleSelect(value: string, event) {
    this.isTextErrorEmptyHidden = true;
    this.options.forEach(option => {
      if (option.value === value) {
        option.checked = event.target.checked;
      }
    });
  }

    ngOnInit() {
      this.questionText = this.question.question.split(';')[0];
      this.questions = this.question.question.split(';')[1].split('/');
      let responses = [];
      if (this.response.id) {
         responses = this.response.response.split('/');
      }
      this.options = [];
      this.questions.forEach(q => {
          this.options.push({
            value: q,
            checked: (responses.indexOf(q) > -1)
          });
        }
      );

    }

    /* DOM events */
    getBackgroundImage() {
      return 'url(\'/assets/img/planets/zoom/surface-planet-' + this.question.category_id + '.png\')';
    }
    onSubmit() {
      if (!this.selectedOptions) {
        this.isTextErrorEmptyHidden = false;
      } else {
        this.isTextErrorEmptyHidden = true;
        this.response.question_id = this.question.id;
        this.response.user_id = this.authService.getCurrentUser().id;
        this.response.response = this.selectedOptions;
        this.percentageService.calculatePercentage();
        if (!this.response.id) {
          this.saveResponse(this.response, false);
        } else {
          this.updateResponse(this.response, this.question.id, false);
        }
      }

    }

  }
  class Option {
    public value: string;
    public checked: boolean;
  }

