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

  /**
   * create game
   * @returns void
   */
  createGame(): void {
    this.whatPlayerIs = Players.PLAYER_1;
    const tmpGame: Game = {
      id: this.generateId(),
      player1Name: 'Jugador 1',
      player2Name: 'Jugador 2',
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
  /**
   * generate random id
   * @returns string random id
   */
  private generateId(): string {
    const randomNumber = Math.floor(Math.random() * 100000 + 1);
    return `tic${randomNumber}tac`;
  }
  /**
   * init board game clear
   * @returns number
   */
  private generateBoard(): number[] {
    let newArrray = [];
    for (let i = 0; i < 9; i++) {
      newArrray.push(0);
    }
    return newArrray;
  }
  /**
   * loading data using service data
   * @param  {string} id from game
   */
  private loadGame(id: string) {
    this.firebaseServices.loadGame(id).subscribe((data) => {
      if (data !== undefined) {
        this.gameSubject.next(data);
      }
    });
  }
  /**
   * joing game with id game
   * @param  {string} id from game
   */
  joinGame(id: string): void {
    this.whatPlayerIs = Players.PLAYER_2;
    this.loadGame(id);
    this.game.subscribe((data) => {
      if (data.isPlayer2 === false) {
        const tmpGame: Partial<Game> = {
          isPlayer2: true,
          stateMatch: StateMatch.PLAYING,
        };
        this.firebaseServices.setGamePartial(tmpGame, id);
        this.router.navigate(['/game']);
      }
    });
  }

  /**
   * make movement game
   * @param  {number} index index board
   * @param  {Game} game object game
   * @returns void
   */
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
  /**
   * finish game
   * @param  {string} id id from game
   * @param  {Players} player witch player playing
   * @returns void
   */
  private finishGame(id: string, player: Players): void {
    const tmpGame: Partial<Game> = {
      stateMatch: StateMatch.FINISH,
      playerInit:
        player === Players.PLAYER_1 ? Players.PLAYER_2 : Players.PLAYER_1,
    };
    this.firebaseServices.setGamePartial(tmpGame, id);
  }
  /**
   * save movement to database using service firebase service
   * @param  {number[]} board board game
   * @param  {Players} player witch player playing
   * @param  {string} id id from game
   * @returns void
   */
  private setMovement(board: number[], player: Players, id: string): void {
    const tmpGame: Partial<Game> = {
      board: board,
      turnPlayer:
        player === Players.PLAYER_1 ? Players.PLAYER_2 : Players.PLAYER_1,
    };
    this.firebaseServices.setGamePartial(tmpGame, id);
  }
  /**
   * generete new game , clear board and change state game
   * @param  {string} id id from game
   * @returns void
   */
  newGame(id: string): void {
    const tmpGame: Partial<Game> = {
      board: this.generateBoard(),
      stateMatch: StateMatch.PLAYING,
    };
    this.firebaseServices.setGamePartial(tmpGame, id);
  }
  /**
   * return if game tied
   * @param  {number[]} board boar from game
   * @returns boolean
   */
  private isTied(board: number[]): boolean {
    let isfull = board.find((element) => element === 0);
    console.log(isfull);
    if (isfull === undefined) {
      return true;
    }
    return false;
  }
  /**
   * return if with movement win game
   * @param  {number[]} board  boar from game
   * @param  {Players} player witch player gaming
   * @returns boolean
   */
  private isWinnerMovement(board: number[], player: Players): boolean {
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
