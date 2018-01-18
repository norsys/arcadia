import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alien } from '../../../models';
import { AuthService } from '../../../services/auth.service';
import { DisplayService } from '../../../services/display.service';
import {Location} from '@angular/common';
import {PercentageService} from '../../../services/percentage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public alien: Alien;
  public percentage: Number;
  public display = false;
  constructor(
    private router: Router,
    private auth: AuthService,
    private percentageService: PercentageService,
    private displayService: DisplayService,
    private location: Location) {}

  ngOnInit() {
    if (this.auth.getCurrentUser()) {
      this.alien = this.auth.getCurrentUser();
    }
    this.displayService.showHeader().subscribe(value => {
      this.display = value;
      if (this.auth.getCurrentUser()) {
        this.alien = this.auth.getCurrentUser();
        this.percentageService.calculatePercentage();
        this.percentageService.observable.subscribe(percentageResult => {
          this.percentage = percentageResult; } );
      }
    });
  }

  home() {
    const currentUrl: String = this.router.url;
    if (currentUrl.indexOf('questions') > 0) {
      this.location.back();
    }else {
      this.router.navigate(['/home']);
    }
  }

  profil() {
    this.router.navigate(['/profil']);
  }

  resume() {
    this.router.navigate(['/resume']);
  }
}
