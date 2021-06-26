import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IzmeniProjekatPage } from './izmeni-projekat.page';

const routes: Routes = [
  {
    path: '',
    component: IzmeniProjekatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IzmeniProjekatPageRoutingModule {}
