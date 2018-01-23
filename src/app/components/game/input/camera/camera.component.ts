import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { ResponseService } from '../../../../services/response.service';
import { ImagesService } from '../../../../services/images.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Question, Response } from '../../../../models';
import {PercentageService} from '../../../../services/percentage.service';
import {AbstractInputComponent} from '../abstract-input/abstract-input.component';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
  providers: [ResponseService, ImagesService]
})
export class CameraComponent extends AbstractInputComponent implements OnInit {

  @Input() question: Question;
  @Input() response: Response;


  imageData: any;
  isImageSelected = false;

  constructor(private authService: AuthService, responseService: ResponseService,
    private imageService: ImagesService, percentageService: PercentageService,
    private sanitizer: DomSanitizer) {
    super(responseService, percentageService);
  }

  ngOnInit() {
    if (!this.imageData && this.response && this.response.response) {
       this.imageService.getImage(this.response.response).then((res: any) => {
         const blob = new Blob([res._body], {
           type: res.headers.get('Content-Type')
         });
         const urlCreator = window.URL;
         this.imageData = this.sanitizer.bypassSecurityTrustUrl(
           urlCreator.createObjectURL(blob));
       });
    }
  }

  /*DOM events*/
  getBackgroundImage() {
    return 'url(\'/assets/img/planets/zoom/surface-planet-' + this.question.category_id + '.png\')';
  }

  readUrl(event) {
    if (event.target.files && event.target.files[0]) {
      this.isImageSelected = true;
      const reader = new FileReader();

      reader.onload = (event: any) => {
        this.imageData = event.target.result;
      };

      this.response.user_id = this.authService.getCurrentUser().id;
      this.response.response = 'photo-' + this.question.id + '-' + this.response.user_id + '.' + event.target.files[0].name.split('.').pop();

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onSubmit() {
    this.response.question_id = this.question.id;
    this.imageService.save(this.response.response, this.imageData).then(() => {
      if (!this.response.id) {
        this.saveResponse(this.response, false);
      }else {
        this.updateImageResponse(this.response, this.question.id);
      }
    });
  }


}
