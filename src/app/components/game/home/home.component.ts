import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { GameService } from '../../../services/game.service';
import { DisplayService } from '../../../services/display.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [GameService]
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private gameSerivce: GameService,private displayService: DisplayService) { }

  ngOnInit() {
    this.displayService.setShowHeader(true);
    if (!this.authService.getCurrentUser().gameIsStarted) {
      this.gameSerivce.startGame(this.authService.getCurrentUser())
        .then(() => console.log('Game is started'))
        .catch(() => console.log('Error in update'));
    }

  }
}
