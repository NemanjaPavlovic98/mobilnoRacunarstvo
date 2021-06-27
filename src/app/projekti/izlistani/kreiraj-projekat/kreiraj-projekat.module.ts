import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { KreirajProjekatPageRoutingModule } from './kreiraj-projekat-routing.module';

import { KreirajProjekatPage } from './kreiraj-projekat.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    KreirajProjekatPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [KreirajProjekatPage]
})
export class KreirajProjekatPageModule {}
