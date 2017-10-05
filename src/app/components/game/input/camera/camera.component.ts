import { Component, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements AfterViewInit, OnDestroy {

  @ViewChild('video') video: any;
  @ViewChild('canvas') canvas: any;

  public takedPhoto: boolean = false;
  public planetName: String;


  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      this.planetName = params['name'];
    });
  }

  getBackgroundImage() {
    return "url('/assets/img/planets/zoom/surface-planet-" + this.planetName + ".png')";
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

}
