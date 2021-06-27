import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetaljiProjektaPageRoutingModule } from './detalji-projekta-routing.module';

import { DetaljiProjektaPage } from './detalji-projekta.page';
import { PrijavaComponent } from 'src/app/prijave/prijava/prijava.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetaljiProjektaPageRoutingModule
  ],
  declarations: [DetaljiProjektaPage, PrijavaComponent],
  entryComponents: [PrijavaComponent]
})
export class DetaljiProjektaPageModule {}
