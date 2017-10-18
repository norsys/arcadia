import { Component, AfterViewInit, OnDestroy, ViewChild, Input, OnInit } from '@angular/core';

import { AuthService } from '../../../../services/auth.service';
import { ResponseService } from '../../../../services/response.service';
import { ImagesService } from '../../../../services/images.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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
  public url: String;

  constructor(private authService: AuthService,
    private responseService: ResponseService,
    private imageService: ImagesService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  getUrl() {
    if (this.response && this.response.response) {
      this.imageService.getImage(this.response.response).then((r) => {
        console.log("tata");
      });
    }
    return this.url;
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

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onSubmit() {
    let responseTmp: Response = new Response()
    responseTmp.question_id = this.question.id;
    responseTmp.user_id = this.authService.getCurrentUser().id;
    responseTmp.response = 'photo-' + this.question.id + '-' + responseTmp.user_id + '.png'

    this.imageService.save(responseTmp.response, this.url).then(() => {
      this.responseService.save(responseTmp).then((body) => {
        this.router.navigate(['/home']);
      }).catch((r) => {
        console.log('errors');
      });
    })

  }
}
