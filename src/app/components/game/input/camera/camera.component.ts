import { Component, Input, OnInit } from '@angular/core';

import { AuthService } from '../../../../services/auth.service';
import { ResponseService } from '../../../../services/response.service';
import { ImagesService } from '../../../../services/images.service';
import { DomSanitizer } from '@angular/platform-browser';

import { Question, Response } from '../../../../models';
import {PercentageService} from '../../../../services/percentage.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
  providers: [ResponseService, ImagesService]
})
export class CameraComponent implements OnInit {

  @Input() question: Question;
  @Input() response: Response;


  imageData: any;

  constructor(private authService: AuthService,
    private responseService: ResponseService,
    private imageService: ImagesService,
    private percentageService: PercentageService,
    private sanitizer: DomSanitizer
  ) {
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

  getBackgroundImage() {
    return "url('/assets/img/planets/zoom/surface-planet-" + this.question.category_id + ".png')";
  }

  readUrl(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        this.imageData = event.target.result;
      }

      this.response.user_id = this.authService.getCurrentUser().id;
      this.response.response = 'photo-' + this.question.id + '-' + this.response.user_id + '.' + event.target.files[0].name.split('.').pop();

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onSubmit() {
    this.response.question_id = this.question.id;
    this.imageService.save(this.response.response, this.imageData).then(() => {
      this.percentageService.calculatePercentage();
      this.responseService.save(this.response).then((body) => {
      window.history.back();
      }).catch((r) => {
        console.log('errors');
      });
    });

  }
}
