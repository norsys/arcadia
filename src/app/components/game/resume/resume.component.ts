import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../../services/questions.service';
import { ResponseService } from '../../../services/response.service';
import { CategoryService } from '../../../services/category.service';

import { Question, Response, Category } from '../../../models';
import {AuthService} from '../../../services/auth.service';
import {DisplayService} from '../../../services/display.service';
import {Router} from '@angular/router';
import {ImagesService} from '../../../services/images.service';
import {DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
  providers: [QuestionsService, ResponseService, CategoryService, ImagesService]
})
export class ResumeComponent implements OnInit {

  public categories: Array<Category>;
  public questions: Array<Question>;
  public responses: Array<Response>;
  donneeImg = [];

  constructor(
    private questionsService: QuestionsService,
    private responseService: ResponseService,
    private authService: AuthService,
    private router: Router,
    private displayService: DisplayService,
    private categoryService: CategoryService,
    private imageService: ImagesService,
    private sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.displayService.setShowHeader(true);
    this.categoryService.getAll().then(categories => {
      this.categories = categories.json();
      this.getImagesPlanets();
    });
    this.questionsService.getAllQuestionsByAgency(this.authService.getCurrentUser().agence_id)
      .then(questions => this.questions = questions.json());
    this.responseService.getAllResponseByUser().then(responses => this.responses = responses.json());
  }

  getImage(question) {
    if (this.responses.filter(response => response.question_id == question.id).length > 0) {
      return '/assets/img/avatars/' + this.authService.getCurrentUser().avatar + '.svg';
    } else {
      return '/assets/img/planets/zoom/aliens/planet-' + question.category_id + '-alien-1.png';
    }
  }

  /*
  getCategoryImage(category) {
    this.imageService.getImage(category.image).then((res: any) => {
      const blob = new Blob([res._body], {
        type: res.headers.get('Content-Type')
      });
      const urlCreator = window.URL;
      return this.sanitizer.bypassSecurityTrustUrl(
        urlCreator.createObjectURL(blob));
    });
  } */
  getQuestions(category) {
    return this.questions.filter(question => question.category_id == category.id);
  }

  isUp() {
    return this.questions && this.responses && this.categories;
  }

  goToQuestion(question: Question, category) {
    var btnclick = document.querySelector('#id' + question.id + '-' + category.id).classList;
    btnclick.add('img-click-animat');
    this.router.navigate(['/planets/' + category.id + '/questions/' + question.id]);
    setTimeout(() => {
      btnclick.remove('img-click-animat');
    }, 1000);
  }

  getImagesPlanets() {
    var i = 0;
    while (i < this.categories.length) {
      let categ = this.categories[i];
      this.imageService.getImage(categ.image).then((res: any) => {
        const blob = new Blob([res._body], {
          type: res.headers.get('Content-Type')
        });
        const urlCreator = window.URL;
        this.donneeImg[categ.id] = this.sanitizer.bypassSecurityTrustUrl(
          urlCreator.createObjectURL(blob));
      });
      i++;
    }
  }
}
