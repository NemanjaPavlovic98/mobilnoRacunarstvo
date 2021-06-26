import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IstaknutoPage } from './istaknuto.page';

const routes: Routes = [
  {
    path: '',
    component: IstaknutoPage
  },
  {
    path: 'detalji-projekta',
    loadChildren: () => import('./detalji-projekta/detalji-projekta.module').then( m => m.DetaljiProjektaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IstaknutoPageRoutingModule {}
