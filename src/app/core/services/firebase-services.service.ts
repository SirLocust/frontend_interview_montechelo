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
export class FirebaseServicesService {
  private gamesCollection: AngularFirestoreCollection<Game>;
  constructor(private afs: AngularFirestore) {
    this.gamesCollection = afs.collection<Game>('Games');
  }

  createGame(game: Game): void {
    // const tmpId = this.afs.createId();

    this.gamesCollection.doc(game.id).set(game);
  }

  loadGame(id: string): Observable<Game | undefined> {
    return this.gamesCollection.doc(id).valueChanges();
  }
  setGamePartial(game: Partial<Game>, id: string): void {
    this.gamesCollection.doc(id).update(game);
  }
}
