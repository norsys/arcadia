import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionsService } from '../../../services/questions.service';
import { ResponseService } from '../../../services/response.service';
import { CategoryService } from '../../../services/category.service';

import { Question, Position, Response } from '../../../models';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {AuthService} from '../../../services/auth.service';
import {DisplayService} from '../../../services/display.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss'],
  providers: [QuestionsService, ResponseService, CategoryService]
})
export class PlanetsComponent implements OnInit {

  public categoryId: String;
  public categoryName: String;
  public questions: Array<Question>;
  public positions: Array<Position> = new Array();
  private responses: Array<Response>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private questionsService: QuestionsService,
    private categoriesService: CategoryService,
    private displayService: DisplayService,
    private responsesService: ResponseService) {
    this.displayService.setShowHeader(true);
  }

  writeAlienPosition() {
    for (let i = 0, len = this.questions.length; i < len; i++) {
      const position = new Position();
      position.top = (Math.floor(Math.random() * 15) + Math.random()) + '%';
      position.left = (Math.floor(Math.random() * 60)) + '%';
      /*
      if (i === 0) {
        position.top = (Math.floor(Math.random() * 15) + 10) + '%';
        position.left = (Math.floor(Math.random() * 60)) + '%';
      } else if (i === 1) {
        position.top = (Math.floor(Math.random() * 20) + 30) + '%';
        position.left = (Math.floor(Math.random() * 60)) + '%';
      } else if (i === 2) {
        position.top = (Math.floor(Math.random() * 20) + 50) + '%';
        position.left = (Math.floor(Math.random() * 60)) + '%';
      }*/
      this.positions.push(position);
    }
  }
  getBackgroundImage() {
    return 'url(\'/assets/img/planets/zoom/surface-planet-' + this.categoryId + '.png\')';
  }

  getAlien(index) {
    if (this.responses.filter(response => response.question_id == this.questions[index].id).length > 0) {
      return '/assets/img/avatars/' + this.authService.getCurrentUser().avatar + '.svg'
    } else {
      //return '/assets/img/planets/zoom/aliens/planet-' + this.categoryId + '-alien-' + ++index + '.png';
      return '/assets/img/planets/zoom/aliens/planet-' + this.categoryId + '-alien-1.png';
    }
  }



  openDefi(id) {
    var btnclick = document.querySelector('#id' + id).classList;
    btnclick.add('img-click-animat');
    console.log('test open défi');
    this.router.navigate(['planets/' + this.questions[id].category_id + '/questions', this.questions[id].id]);
    setTimeout(() => {
      btnclick.remove('img-click-animat');
    }, 2000);

  }

  isUp() {
    return this.questions && this.responses;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryId = params['categoryId'];
      this.categoriesService.getById(this.categoryId).then((response) => this.categoryName = response.json().name);
      //this.questionsService.getAll().then((response) => {
      this.questionsService.getAllQuestionsByAgency(this.authService.getCurrentUser().agence_id).then((response) => {
        this.questions = response.json().filter(question => question.category_id.toString() === this.categoryId);
        this.responsesService.getAllResponseByUser().then(response => this.responses = response.json());
        this.writeAlienPosition();

      });
    });
  }

  swip() {
    this.router.navigate(['/home']);
  }

}
