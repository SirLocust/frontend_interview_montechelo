import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { PageGameComponent } from './components/page-game/page-game.component';
import { BoardComponent } from './components/board/board.component';
import { InputNameComponent } from './components/input-name/input-name.component';

@NgModule({
  declarations: [PageGameComponent, BoardComponent, InputNameComponent],
  imports: [CommonModule, GameRoutingModule, ReactiveFormsModule],
})
export class GameModule {}
