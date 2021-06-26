import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'projekti',
    pathMatch: 'full'
  },
  {
    path: 'projekti',
    loadChildren: () => import('./projekti/projekti.module').then( m => m.ProjektiPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'prijave',
    loadChildren: () => import('./prijave/prijave.module').then( m => m.PrijavePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
