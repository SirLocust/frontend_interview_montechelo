import { Players } from './../../enums/typePlayers';
import { Game } from './../../models/game';
import { FirebaseServicesService } from './../firebase-services.service';

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { StateMatch } from '@core/enums/stateMatch';

@Injectable({
  providedIn: 'root',
})
export class LogicGameService {
  gameSubject = new Subject<Game>();
  game = this.gameSubject.asObservable();
  whatPlayerIs: Players = Players.NOT_PLAYER;
  constructor(
    private firebaseServices: FirebaseServicesService,
    private router: Router
  ) {}

  createGame(): void {
    this.whatPlayerIs = Players.PLAYER_1;
    const tmpGame: Game = {
      id: this.generateId(),
      player1Name: 'Jugador 1',
      player2Name: 'Jugador 2”',
      board: this.generateBoard(),
      playerInit: this.whatPlayerIs,
      turnPlayer: this.whatPlayerIs,
      isPlayer1: true,
      isPlayer2: false,
      stateMatch: StateMatch.WAITING,
    };
    this.firebaseServices.createGame(tmpGame);

    this.loadGame(tmpGame.id);

    this.router.navigate(['/game']);
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
    this.firebaseServices.loadGame(id).subscribe((data) => {
      if (data !== undefined) {
        this.gameSubject.next(data);
      }
    });
  }

  joinGame(id: string): void {
    this.whatPlayerIs = Players.PLAYER_2;
    this.loadGame(id);
    const tmpGame: Partial<Game> = {
      isPlayer2: true,
      stateMatch: StateMatch.PLAYING,
    };
    this.firebaseServices.setGamePartial(tmpGame, id);
    this.router.navigate(['/game']);
  }

  Movement(index: number, game: Game): void {
    if (game.turnPlayer !== this.whatPlayerIs) {
      return;
    }
    let tmpArray = [...game.board];
    tmpArray[index] = this.whatPlayerIs === Players.PLAYER_1 ? 1 : 2;
    this.setMovement(tmpArray, game.turnPlayer, game.id);
    if (
      this.isWinnerMovement(tmpArray, game.turnPlayer) ||
      this.isTied(tmpArray)
    ) {
      this.finishGame(game.id, game.playerInit);
    }
  }

  finishGame(id: string, player: Players): void {
    const tmpGame: Partial<Game> = {
      stateMatch: StateMatch.FINISH,
      playerInit:
        player === Players.PLAYER_1 ? Players.PLAYER_2 : Players.PLAYER_1,
    };
    this.firebaseServices.setGamePartial(tmpGame, id);
  }

  setMovement(board: number[], player: Players, id: string): void {
    const tmpGame: Partial<Game> = {
      board: board,
      turnPlayer:
        player === Players.PLAYER_1 ? Players.PLAYER_2 : Players.PLAYER_1,
    };
    this.firebaseServices.setGamePartial(tmpGame, id);
  }
  newGame(id: string): void {
    const tmpGame: Partial<Game> = {
      board: this.generateBoard(),
      stateMatch: StateMatch.PLAYING,
    };
    this.firebaseServices.setGamePartial(tmpGame, id);
  }

  isTied(board: number[]): boolean {
    let isfull = board.find((element) => element === 0);
    console.log(isfull);
    if (isfull === undefined) {
      return true;
    }
    return false;
  }
  isWinnerMovement(board: number[], player: Players): boolean {
    player = player === Players.PLAYER_1 ? 1 : 2;
    for (let i = 0; i <= 6; i += 3) {
      if (
        board[i] === player &&
        board[i + 1] === player &&
        board[i + 2] === player
      ) {
        return true;
      }
    }
    for (let i = 0; i <= 2; i++) {
      if (
        board[i] === player &&
        board[i + 3] === player &&
        board[i + 6] === player
      ) {
        return true;
      }
    }
    if (
      (board[0] == player && board[4] == player && board[8] == player) ||
      (board[2] == player && board[4] == player && board[6] == player)
    ) {
      return true;
    }
    return false;
  }
}
