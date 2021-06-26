import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IzlistaniPage } from './izlistani.page';

const routes: Routes = [
  {
    path: '',
    component: IzlistaniPage
  },
  {
    path: 'kreiraj-projekat',
    loadChildren: () => import('./kreiraj-projekat/kreiraj-projekat.module').then( m => m.KreirajProjekatPageModule)
  },
  {
    path: 'izmeni-projekat',
    loadChildren: () => import('./izmeni-projekat/izmeni-projekat.module').then( m => m.IzmeniProjekatPageModule)
  },
  {
    path: 'prijave',
    loadChildren: () => import('./prijave/prijave.module').then( m => m.PrijavePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IzlistaniPageRoutingModule {}
