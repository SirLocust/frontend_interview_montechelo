import { Game } from '@core/models/game';
import { Component, Input, OnInit } from '@angular/core';
import { LogicGameService } from '@core/services/logicGame/logic-game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  @Input() game!: Game;
  constructor(private logicGame: LogicGameService) {}

  ngOnInit(): void {}
  movement(index: number, game: Game) {
    if (game.board[index] !== 0) {
      return;
    }
    this.logicGame.Movement(index, game);
  }
}
