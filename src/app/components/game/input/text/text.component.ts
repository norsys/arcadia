import { Component, Input ,OnInit} from '@angular/core';
import { Question, Response } from '../../../../models';


import { AuthService } from '../../../../services/auth.service';
import { ResponseService } from '../../../../services/response.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {


  @Input() question: Question;
  @Input() response: Response;

  constructor(private authService: AuthService,
    private responseService: ResponseService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
  }

  getBackgroundImage() {
    return "url('/assets/img/planets/zoom/surface-planet-" + this.question.category_id + ".png')";
  }

  onSubmit() {
    this.response.question_id = this.question.id;
    this.response.user_id = this.authService.getCurrentUser().id;
    this.responseService.save(this.response).then((body) => {
    window.history.back();
    }).catch((r) => {
      console.log('errors');
    });
  }
}
