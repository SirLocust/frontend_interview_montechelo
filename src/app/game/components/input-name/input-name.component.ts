import { Players } from './../../../core/enums/typePlayers';
import { LogicGameService } from '@core/services/logicGame/logic-game.service';
import { Game } from '@core/models/game';
import { FirebaseServicesService } from './../../../core/services/firebase-services.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-name',
  templateUrl: './input-name.component.html',
  styleUrls: ['./input-name.component.scss'],
})
export class InputNameComponent implements OnInit {
  @Input() playerName: string = '';
  @Input() id: string = '';
  @Input() player: Players = Players.NOT_PLAYER;
  whatIsPlayer = this.logicGame.whatPlayerIs;
  inputName = new FormControl('', [Validators.required]);
  IsEditing = false;
  constructor(
    private firebaService: FirebaseServicesService,
    private logicGame: LogicGameService
  ) {}

  ngOnInit(): void {}

  editingMode(): void {
    this.IsEditing = true;
  }

  saveNewName(): void {
    if (!this.inputName.valid) {
      return;
    }
    const tmpGame: Partial<Game> = {};

    if (this.whatIsPlayer === Players.PLAYER_1) {
      tmpGame.player1Name = this.inputName.value;
    }
    if (this.whatIsPlayer === Players.PLAYER_2) {
      tmpGame.player2Name = this.inputName.value;
    }

    this.firebaService.setGamePartial(tmpGame, this.id);
    this.IsEditing = false;
  }
}
