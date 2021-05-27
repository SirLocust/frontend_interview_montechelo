import { Players } from './../../../core/enums/typePlayers';
import { StateMatch } from '@core/enums/stateMatch';

import { LogicGameService } from '@core/services/logicGame/logic-game.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-game',
  templateUrl: './page-game.component.html',
  styleUrls: ['./page-game.component.scss'],
})
export class PageGameComponent implements OnInit {
  stateMatch = StateMatch;
  player = Players;
  game$ = this.logicGame.game;
  constructor(private logicGame: LogicGameService) {}

  ngOnInit(): void {}

  newGame(id: string) {
    this.logicGame.newGame(id);
  }
}
