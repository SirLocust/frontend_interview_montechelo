import { Game } from './../../models/game';
import { FirebaseServicesService } from './../firebase-services.service';

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogicGameService {
  constructor(private firebaseServices: FirebaseServicesService) {}
  game: Observable<Game | undefined> = new Subject();
  newGame(): void {
    const tmpGame: Game = {
      id: this.generateId(),
      player1: 'player1',
      player2: 'player2',
      board: this.generateBoard(),
      numberGame: 0,
    };

    this.firebaseServices.createGame(tmpGame);

    this.loadGame(tmpGame.id);
  }
  private generateId(): string {
    const randomNumber = Math.floor(Math.random() * 100000 + 1);
    return `tic${randomNumber}tac`;
  }

  private generateBoard(): number[] {
    let newArrray = [];
    for (let i = 0; i < 9; i++) {
      newArrray.push(0);
    }
    return newArrray;
  }

  loadGame(id: string) {
    this.game = this.firebaseServices.loadGame(id);
  }
}
