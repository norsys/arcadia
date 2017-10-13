import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { QuestionsService } from '../../../services/questions.service'
import { Question } from '../../../models'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss'],
  providers: [QuestionsService]
})
export class PlanetsComponent implements OnInit {

  public categoryId: String;
  public questions: Array<Question>;

  constructor(private route: ActivatedRoute, private router: Router, private questionsService: QuestionsService) {
    this.route.params.subscribe(params => {
      this.categoryId = params['categoryId'];
      this.questionsService.getAll().then((response) => this.questions = response.json().filter(question => question.category_id.toString() === this.categoryId));
    });
  }

  getBackgroundImage() {
    return "url('/assets/img/planets/zoom/surface-planet-" + this.categoryId + ".png')";
  }

  getAlien() {
    return '/assets/img/planets/zoom/aliens/planet-' + this.categoryId + '-alien-1.png';
  }
  openDefi(question) {
    this.router.navigate(['/questions', question.id]);
  }
  ngOnInit() {

  }

}
