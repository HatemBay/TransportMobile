import { TabsPage } from './layouts/tabs/tabs.page';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './components/login/login.page';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPage,
    loadChildren: () =>
      import('./components/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: '',
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./layouts/tabs/tabs.module').then((m) => m.TabsPageModule),
      },
    ],
  },
  // {
  //   path: '**',
  //   redirectTo: 'home',
  // },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    // RouterModule.forRoot(routes, {
    //   useHash: false,
    // }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
