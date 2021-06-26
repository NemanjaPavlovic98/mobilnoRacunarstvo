import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrijavePage } from './prijave.page';

const routes: Routes = [
  {
    path: '',
    component: PrijavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrijavePageRoutingModule {}
