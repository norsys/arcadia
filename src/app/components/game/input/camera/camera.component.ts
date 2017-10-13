import { Component, AfterViewInit, OnDestroy, ViewChild, Input } from '@angular/core';

import { AuthService } from '../../../../services/auth.service';
import { ResponsesService } from '../../../../services/responses.service';
import { ImagesService } from '../../../../services/images.service';

import { Question, Response } from '../../../../models';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements AfterViewInit, OnDestroy {

  @ViewChild('video') video: any;
  @ViewChild('canvas') canvas: any;

  @Input() question: Question;

  public takedPhoto: boolean = false;
  public planetName: String;


  constructor(private authService: AuthService, private responseService: ResponsesService, private imageService: ImagesService) {
  }

  getBackgroundImage() {
    return "url('/assets/img/planets/zoom/surface-planet-" + this.question.category_id + ".png')";
  }

  takePhoto() {
    if (this.takedPhoto) {
      this.takedPhoto = false;
    } else {
      var context = this.canvas.nativeElement.getContext('2d');
      context.drawImage(this.video.nativeElement, 0, 0, 200, 200);
      this.takedPhoto = true;
    }
  }

  ngAfterViewInit() {
    let _video = this.video.nativeElement;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          _video.src = window.URL.createObjectURL(stream);
          _video.play();
        })
    }
  }
  ngOnDestroy() {
    let _video = this.video.nativeElement;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          var track = stream.getTracks()[0];  // if only one media track
          track.stop();
        })
    }

  }
  onSubmit() {
    let response: Response = new Response()
    response.question_id = this.question.id;
    response.user_id = this.authService.getCurrentUser().id;
    response.response = 'photo-' + this.question.id + '-' + response.user_id + '.png'

    var data = this.canvas.nativeElement.getContext('2d').toDataURL("image/png");

    this.imageService.save(data).then(() => this.responseService.save(response))

  }
}
