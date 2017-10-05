import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {

  public planetName: String;
  
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      this.planetName = params['name'];
    });
  }

  getBackgroundImage() {
    return "url('/assets/img/planets/zoom/surface-planet-" + this.planetName + ".png')";
  }

  ngOnInit() {
  }

}
