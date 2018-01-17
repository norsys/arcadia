import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

@Injectable()
export class DisplayService {

  private displayHeader = new Subject<boolean>();

  constructor() { }

  setShowHeader(value) {
    this.displayHeader.next(value);
  }

  showHeader() {
    return this.displayHeader;
  }
}
