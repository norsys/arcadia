import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alien } from '../../../models';
import { AuthService } from '../../../services/auth.service';
import { QuestionsService } from '../../../services/questions.service';
import { ResponseService } from '../../../services/response.service';
import { DisplayService } from '../../../services/display.service';
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
    private displayService: DisplayService) {
    if (this.auth.getCurrentUser()) {
      this.alien = auth.getCurrentUser();
    }
    this.displayService.showHeader().subscribe(value => {
      this.alien = auth.getCurrentUser();
      this.calculatePercentage();
      this.display = value
    });
  }

  ngOnInit() {
  }


  calculatePercentage() {
    this.questionsService.getAll().then((questions) => {
      this.responseService.getAll().then((response) => {
        this.percentage = (response.json().length * 100) / questions.json().length;
      })
    });

  }

  home() {
    this.router.navigate(['/']);
  }

  logout() {
    this.auth.logout().then((alien) => {
      localStorage.removeItem("user_arcadia");
      this.displayService.setShowHeader(false);
      this.router.navigate(['/']);
    }).catch((err) => {
      localStorage.removeItem("user_arcadia");
      this.router.navigate(['/']);
      console.log(err);
    });
  }
}
