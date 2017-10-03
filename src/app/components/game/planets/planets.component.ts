import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent implements OnInit {

  public planetName: String;

  constructor(private route: ActivatedRoute) {
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
