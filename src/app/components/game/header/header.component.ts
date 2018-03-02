import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Alien} from '../../../models';
import {AuthService} from '../../../services/auth.service';
import {DisplayService} from '../../../services/display.service';
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

  constructor(private router: Router,
              private auth: AuthService,
              private percentageService: PercentageService,
              private displayService: DisplayService,
              private location: Location) {
  }

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
          this.percentage = percentageResult;
        });
      }
    });
  }

  animate(btn: string) {
    var btnclick = document.querySelector(btn).classList;
    btnclick.add('img-click');
    btnclick.add('img-click-animat');
    setTimeout(() => {
      btnclick.remove('img-click');
      btnclick.remove('img-click-animat');
    }, 2000);
  }

  /*Routes*/
  home() {
    this.animate('#home-btn');
    const currentUrl: String = this.router.url;
    if (currentUrl.indexOf('questions') > 0) {
      this.location.back();
    } else {
      this.router.navigate(['/home']);
    }

  }

  profil() {
    this.animate('#profile-btn');
    this.router.navigate(['/profil']);
  }

  resume() {
    var btnclick = document.querySelector('#trophees-btn').classList;
    //btnclick.add("trophees-click");
    btnclick.add('trophees-click-animat');
    this.router.navigate(['/resume']);
    setTimeout(() => {
      //btnclick.remove("img-click");
      btnclick.remove('trophees-click-animat');
    }, 1000);
  }
}
