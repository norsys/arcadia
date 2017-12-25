import { Component, AfterViewInit, OnDestroy, ViewChild, Input, OnInit } from '@angular/core';

import { AuthService } from '../../../../services/auth.service';
import { ResponseService } from '../../../../services/response.service';
import { ImagesService } from '../../../../services/images.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { Question, Response } from '../../../../models';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
  providers: [ResponseService, ImagesService]
})
export class CameraComponent implements OnInit {

  @Input() question: Question;
  @Input() response: Response;

  public takedPhoto: boolean = false;
  public planetName: String;
  public url: string;

  constructor(private authService: AuthService,
    private responseService: ResponseService,
    private imageService: ImagesService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
    if (!this.url && this.response && this.response.response) {
      this.url = this.imageService.getImage(this.response.response);
    }
  }

  getUrl() {
    return this.sanitizer.bypassSecurityTrustUrl(this.url);
  }
  getBackgroundImage() {
    return "url('/assets/img/planets/zoom/surface-planet-" + this.question.category_id + ".png')";
  }

  readUrl(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.url = event.target.result;
      }

      this.response.user_id = this.authService.getCurrentUser().id;
      this.response.response = 'photo-' + this.question.id + '-' + this.response.user_id + '.' + event.target.files[0].name.split('.').pop();

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onSubmit() {
    this.response.question_id = this.question.id;

    this.imageService.save(this.response.response, this.url).then(() => {
      this.responseService.save(this.response).then((body) => {
      window.history.back();
      }).catch((r) => {
        console.log('errors');
      });
    })

  }
}
