import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IstaknutoPageRoutingModule } from './istaknuto-routing.module';

import { IstaknutoPage } from './istaknuto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IstaknutoPageRoutingModule
  ],
  declarations: [IstaknutoPage]
})
export class IstaknutoPageModule {}
