import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InitScreenRoutingModule } from './init-screen-routing.module';
import { PageInitScreenComponent } from './components/page-init-screen/page-init-screen.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PageInitScreenComponent],
  imports: [CommonModule, InitScreenRoutingModule, ReactiveFormsModule],
})
export class InitScreenModule {}
