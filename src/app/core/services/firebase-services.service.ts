import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Game } from '@core/models/game';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
/**
 * service for crud database
 */
export class FirebaseServicesService {
  private gamesCollection: AngularFirestoreCollection<Game>;
  constructor(private afs: AngularFirestore) {
    this.gamesCollection = afs.collection<Game>('Games');
  }

  /**
   * added item to database
   * @param  {Game} game
   * @returns void
   */
  createGame(game: Game): void {
    // const tmpId = this.afs.createId();

    this.gamesCollection.doc(game.id).set(game);
  }
  /**
   * loading item from database
   * @param  {string} id
   * @returns Observable type Game | undefined
   */
  loadGame(id: string): Observable<Game | undefined> {
    return this.gamesCollection.doc(id).valueChanges();
  }
  /**
   * update item to database
   * @param  {Partial<Game>} game
   * @param  {string} id
   * @returns void
   */
  setGamePartial(game: Partial<Game>, id: string): void {
    this.gamesCollection.doc(id).update(game);
  }
}
