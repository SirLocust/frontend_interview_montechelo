import { LogicGameService } from './services/logicGame/logic-game.service';
import { FirebaseServicesService } from './services/firebase-services.service';
import { AngularFireModule } from '@angular/fire';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule, AngularFireModule],
  providers: [FirebaseServicesService, LogicGameService],
})
export class CoreModule {}
