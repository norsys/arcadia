import {Component, Input, OnInit, Sanitizer} from '@angular/core';
import { Question, Response } from '../../../../models';
import { AuthService } from '../../../../services/auth.service';
import { ResponseService } from '../../../../services/response.service';
import {PercentageService} from '../../../../services/percentage.service';
import {AbstractInputComponent} from '../abstract-input/abstract-input.component';
import {NotifyService} from '../../../../services/notify.service';
import {ImagesService} from '../../../../services/images.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-boolean',
  templateUrl: './boolean.component.html',
  styleUrls: ['./boolean.component.scss'],
  providers: [ImagesService]
})
export class BooleanComponent extends AbstractInputComponent implements OnInit {

  @Input() question: Question;
  @Input() response: Response;
  textErrorEmpty= 'Erreur reponse est vide!';
  isTextErrorEmptyHidden= true;
  DataZoom: any;
  constructor(responseService: ResponseService,
              private authService: AuthService,
              percentageService: PercentageService,
              notif: NotifyService,
              private imageService: ImagesService,
              private sanitizer: DomSanitizer ) {
    super(responseService, percentageService, notif);
  }

  ngOnInit() {
    this.getBackgroundImage();
  }

  /* DOM events */
  getBackgroundImage() {
    //return 'url(\'/assets/img/planets/zoom/surface-planet-' + this.question.category_id + '.png\')';
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
