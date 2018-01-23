import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../../services/questions.service';
import { ResponseService } from '../../../services/response.service';
import { CategoryService } from '../../../services/category.service';

import { Question, Response, Category } from '../../../models'
@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
  providers: [QuestionsService, ResponseService, CategoryService]
})
export class ResumeComponent implements OnInit {

  public categories: Array<Category>;
  public questions: Array<Question>;
  public responses: Array<Response>;

  constructor(
    private questionsService: QuestionsService,
    private responseService: ResponseService,
    private categoryService: CategoryService) {

  }

  ngOnInit() {
    this.categoryService.getAll().then(categories => this.categories = categories.json())
    this.questionsService.getAll().then(questions => this.questions = questions.json());
    this.responseService.getAllResponseByUser().then(responses => this.responses = responses.json());
  }

  getImage(question) {
    if (this.responses.filter(response => response.question_id == question.id).length > 0) {
      return '/assets/img/rum.png';
    } else {
      return '/assets/img/planets/zoom/aliens/planet-' + question.category_id + '-alien-1.png';
    }
  }

  getCategoryImage(category) {
    return '/assets/img/planets/planet-' + category.id + '.png';
  }
  getQuestions(category) {
    return this.questions.filter(question => question.category_id == category.id);
  }

  isUp() {
    return this.questions && this.responses && this.categories;
  }
}
