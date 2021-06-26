import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IzlistaniPageRoutingModule } from './izlistani-routing.module';

import { IzlistaniPage } from './izlistani.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IzlistaniPageRoutingModule
  ],
  declarations: [IzlistaniPage]
})
export class IzlistaniPageModule {}
