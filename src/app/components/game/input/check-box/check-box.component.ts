import { Component, Input, OnInit } from '@angular/core';
import { Question, Response } from '../../../../models';
import { AuthService } from '../../../../services/auth.service';
import { ResponseService } from '../../../../services/response.service';
import { PercentageService } from '../../../../services/percentage.service';
import { AbstractInputComponent } from '../abstract-input/abstract-input.component';
import { NotifyService } from '../../../../services/notify.service';
import { ImagesService } from '../../../../services/images.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss'],
  providers: [ImagesService]
})

export class CheckBoxComponent extends AbstractInputComponent implements OnInit {

  @Input() question: Question;
  @Input() response: Response;
  textErrorEmpty = 'Erreur de la réponse est vide!';
  isTextErrorEmptyHidden = true;

  questionText: string;
  questions: string[];
  public options: Option[];
  DataZoom: any;

  get selectedOptions() {
    const selected = this.options
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
    notif: NotifyService,
    private imageService: ImagesService,
    private sanitizer: DomSanitizer) {
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
    this.getBackgroundImage();
  }

  /* DOM events */
  getBackgroundImage() {
    if (this.question) {
      let categ = this.question.Category;
      this.imageService.getImage(categ.imageZoom).then((res: any) => {
        const blob = new Blob([res._body], {
          type: res.headers.get('Content-Type')
        });
        const urlCreator = window.URL;
        this.DataZoom = this.sanitizer.bypassSecurityTrustStyle('url(' + urlCreator.createObjectURL(blob) + ')');
      });
    }
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

