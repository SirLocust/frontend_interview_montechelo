import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { PageGameComponent } from './components/page-game/page-game.component';
import { BoardComponent } from './components/board/board.component';


@NgModule({
  declarations: [
    PageGameComponent,
    BoardComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule
  ]
})
export class GameModule { }
