import { StateMatch } from './../enums/stateMatch';
import { Players } from './../enums/typePlayers';
export interface Game {
  id: string;
  player1Name: string;
  player2Name: string;
  board: number[];
  playerInit: Players;
  turnPlayer: Players;
  isPlayer1: boolean;
  isPlayer2: boolean;
  stateMatch: StateMatch;
}
