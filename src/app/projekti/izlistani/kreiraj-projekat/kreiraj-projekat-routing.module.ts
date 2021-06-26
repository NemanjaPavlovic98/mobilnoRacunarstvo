import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KreirajProjekatPage } from './kreiraj-projekat.page';

const routes: Routes = [
  {
    path: '',
    component: KreirajProjekatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KreirajProjekatPageRoutingModule {}
