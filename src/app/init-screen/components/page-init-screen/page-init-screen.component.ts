import { LogicGameService } from '@core/services/logicGame/logic-game.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-page-init-screen',
  templateUrl: './page-init-screen.component.html',
  styleUrls: ['./page-init-screen.component.scss'],
})
export class PageInitScreenComponent implements OnInit {
  isNewGame = true;
  inputId: FormControl = new FormControl('', [Validators.required]);
  constructor(public logicGame: LogicGameService) {}

  ngOnInit(): void {}

  startGame(): void {
    this.logicGame.newGame();
  }

  toggleIsnewGame() {
    this.isNewGame = !this.isNewGame;
  }
  joinGame() {
    if (!this.inputId.value) {
      console.log('not value');
    }

    this.logicGame.loadGame(this.inputId.value);
  }
}
