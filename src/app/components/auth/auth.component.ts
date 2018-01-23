import { Component, OnInit } from '@angular/core';
import { DisplayService } from '../../services/display.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public swipe = false;

  constructor(private displayService: DisplayService) { }

  onSwipe(swipe: boolean) {
    this.swipe = swipe;
  }

  ngOnInit() {
    this.displayService.setShowHeader(false);
  }
}
