import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alien } from '../../../models';
import { AuthService } from '../../../services/auth.service';
import { QuestionsService } from '../../../services/questions.service';
import { ResponseService } from '../../../services/response.service';
import { DisplayService } from '../../../services/display.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [QuestionsService, ResponseService]
})
export class HeaderComponent implements OnInit {

  public alien: Alien;
  public percentage: Number
  public display: boolean = false;
  constructor(private router: Router,
    private auth: AuthService,
    private questionsService: QuestionsService,
    private responseService: ResponseService,
    private displayService: DisplayService,
              private location: Location) {
    if (this.auth.getCurrentUser()) {
      this.alien = auth.getCurrentUser();
    }
    this.displayService.showHeader().subscribe(value => {
      this.display = value
      if (this.auth.getCurrentUser()) {
        this.alien = auth.getCurrentUser();
        this.calculatePercentage();
      }
    });
  }

  ngOnInit() {
  }

/*update percentage*/
  calculatePercentage() {
    this.questionsService.getAll().then((questions) => {
      this.responseService.getAll().then((response) => {
        this.percentage = Math.floor((response.json().length * 100) / questions.json().length);
      })
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
