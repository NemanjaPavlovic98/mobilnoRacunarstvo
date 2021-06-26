import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjektiPageRoutingModule } from './projekti-routing.module';

import { ProjektiPage } from './projekti.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjektiPageRoutingModule
  ],
  declarations: [ProjektiPage]
})
export class ProjektiPageModule {}
