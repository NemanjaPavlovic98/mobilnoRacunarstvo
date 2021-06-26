import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetaljiProjektaPageRoutingModule } from './detalji-projekta-routing.module';

import { DetaljiProjektaPage } from './detalji-projekta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetaljiProjektaPageRoutingModule
  ],
  declarations: [DetaljiProjektaPage]
})
export class DetaljiProjektaPageModule {}
