import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KreirajProjekatPageRoutingModule } from './kreiraj-projekat-routing.module';

import { KreirajProjekatPage } from './kreiraj-projekat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KreirajProjekatPageRoutingModule
  ],
  declarations: [KreirajProjekatPage]
})
export class KreirajProjekatPageModule {}
