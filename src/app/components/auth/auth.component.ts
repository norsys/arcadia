import { Component, OnChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  public swipe: boolean = false;

  constructor() { }

  onSwipe(swipe: boolean) {
    this.swipe = swipe;
  }
}
