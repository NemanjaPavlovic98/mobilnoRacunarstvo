import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrijavePageRoutingModule } from './prijave-routing.module';

import { PrijavePage } from './prijave.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrijavePageRoutingModule
  ],
  declarations: [PrijavePage]
})
export class PrijavePageModule {}
