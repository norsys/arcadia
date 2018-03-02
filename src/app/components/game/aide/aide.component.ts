///<reference path="../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import { Component, OnInit } from '@angular/core';
import {DisplayService} from '../../../services/display.service';

@Component({
  selector: 'app-aide',
  templateUrl: './aide.component.html',
  styleUrls: ['./aide.component.scss']
})
export class AideComponent implements OnInit {

  constructor(private displayService: DisplayService) { }

  ngOnInit() {
    this.displayService.setShowHeader(true);
  }

}
