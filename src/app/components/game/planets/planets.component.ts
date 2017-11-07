import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { QuestionsService } from '../../../services/questions.service'
import { ResponseService } from '../../../services/response.service'

import { Question, Position, Response } from '../../../models'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss'],
  providers: [QuestionsService, ResponseService]
})
export class PlanetsComponent implements OnInit {

  public categoryId: String;
  public questions: Array<Question>;
  public positions: Array<Position> = new Array();
  private responses: Array<Response>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionsService: QuestionsService,
    private responsesService: ResponseService) {   
  }

  writeAlienPosition() {
    for (var i = 0, len = this.questions.length; i < len; i++) {
      let position = new Position();
      if (i == 0) {
        position.top = (Math.floor(Math.random() * 15) + 20) + "%"
        position.left = (Math.floor(Math.random() * 60)) + "%"
      } else if (i == 1) {
        position.top = (Math.floor(Math.random() * 20) + 40) + "%"
        position.left = (Math.floor(Math.random() * 60)) + "%"
      } else if (i == 2) {
        position.top = (Math.floor(Math.random() * 20) + 60) + "%"
        position.left = (Math.floor(Math.random() * 60)) + "%"
      }
      this.positions.push(position);
    };
  }
  getBackgroundImage() {
    return "url('/assets/img/planets/zoom/surface-planet-" + this.categoryId + ".png')";
  }

  getAlien(index) {
    if (this.responses.filter(response => response.question_id == this.questions[index].id).length > 0) {
      return '/assets/img/rum.png'
    } else {
      return '/assets/img/planets/zoom/aliens/planet-' + this.categoryId + '-alien-' + ++index + '.png';
    }
  }

  openDefi(id) {
    this.router.navigate(['/questions', this.questions[id].id]);
  }

  isUp() {
    return this.questions && this.responses;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryId = params['categoryId'];
      this.questionsService.getAll().then((response) => {
        this.questions = response.json().filter(question => question.category_id.toString() === this.categoryId)
        this.responsesService.getAllResponseByUser().then(response => this.responses = response.json());
        this.writeAlienPosition();

      });
    });
  }

}
