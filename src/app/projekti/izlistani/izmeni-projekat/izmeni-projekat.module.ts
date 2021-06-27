import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { IzmeniProjekatPageRoutingModule } from './izmeni-projekat-routing.module';

import { IzmeniProjekatPage } from './izmeni-projekat.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    IzmeniProjekatPageRoutingModule,
    ReactiveFormsModule
    
  ],
  declarations: [IzmeniProjekatPage]
})
export class IzmeniProjekatPageModule {}
