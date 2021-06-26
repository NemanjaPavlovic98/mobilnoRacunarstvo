import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjektiPage } from './projekti.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: ProjektiPage,
    children:[
      {
        path: 'istaknuto',
        children: [
          {
            path: '',
            loadChildren: () => import('./istaknuto/istaknuto.module').then(m => m.IstaknutoPageModule)
          },
          {
            path: ':projekatId',
            loadChildren: () => import('./istaknuto/detalji-projekta/detalji-projekta.module').then(m => m.DetaljiProjektaPageModule)
          }
        ]
      },
      {
        path: 'izlistani',
        children: [
          {
            path: '',
            loadChildren: () => import('./izlistani/izlistani.module').then(m => m.IzlistaniPageModule)
          },
          {
            path: 'novi',
            loadChildren: () => import('./izlistani/kreiraj-projekat/kreiraj-projekat.module').then(m => m.KreirajProjekatPageModule)
          },
          {
            path: 'izmeni/:projekatId',
            loadChildren: () => import('./izlistani/izmeni-projekat/izmeni-projekat.module').then(m => m.IzmeniProjekatPageModule)
          },
          {
            path: ':placeId',
            loadChildren: () => import('./izlistani/prijave/prijave.module').then(m => m.PrijavePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/projekti/tabs/istaknuto',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/projekti/tabs/istaknuto',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjektiPageRoutingModule {}
