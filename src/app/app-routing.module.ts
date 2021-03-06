import { ForgotPasswordPage } from './components/forgot-password/forgot-password.page';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './components/login/login.page';
import { RoleGuard } from './services/role.guard';

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
    path: 'forgot-password',
    component: ForgotPasswordPage,
    loadChildren: () =>
      import('./components/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordPageModule
      ),
  },
  {
    path: '',
    // canActivate: [AuthGuard],
    canActivate: [RoleGuard],
    data: {
      expectedRoles: ['chauffeur'],
    },
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./layouts/tabs/tabs.module').then((m) => m.TabsPageModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
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
