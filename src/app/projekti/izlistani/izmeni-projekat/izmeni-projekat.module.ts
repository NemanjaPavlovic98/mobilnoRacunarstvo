import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IzmeniProjekatPageRoutingModule } from './izmeni-projekat-routing.module';

import { IzmeniProjekatPage } from './izmeni-projekat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IzmeniProjekatPageRoutingModule
  ],
  declarations: [IzmeniProjekatPage]
})
export class IzmeniProjekatPageModule {}
