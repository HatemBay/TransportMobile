import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../../components/home/home.module').then(
            (m) => m.HomePageModule
          ),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../../components/tab1/tab1.module').then(
            (m) => m.Tab1PageModule
          ),
      },
      {
        path: 'tab2',
        loadChildren: () =>
          import('../../components/tab2/tab2.module').then(
            (m) => m.Tab2PageModule
          ),
      },
      {
        path: 'tab3',
        loadChildren: () =>
          import('../../components/tab3/tab3.module').then(
            (m) => m.Tab3PageModule
          ),
      },
      {
        path: 'collecte-detail',
        loadChildren: () =>
          import(
            '../../components/collecte-detail/collecte-detail.module'
          ).then((m) => m.CollecteDetailPageModule),
      },
      {
        path: 'collecte',
        loadChildren: () =>
          import('../../components/collecte/collecte.module').then(
            (m) => m.CollectePageModule
          ),
      },
      {
        path: 'cherche',
        loadChildren: () =>
          import('../../components/cherche/cherche.module').then(
            (m) => m.CherchePageModule
          ),
      },
      {
        path: 'cause-reporte',
        loadChildren: () =>
          import('../../components/cause-reporte/cause-reporte.module').then(
            (m) => m.CauseReportePageModule
          ),
      },
      {
        path: 'cause-annuler',
        loadChildren: () =>
          import('../../components/cause-annuler/cause-annuler.module').then(
            (m) => m.CauseAnnulerPageModule
          ),
      },
      {
        path: 'delegation',
        loadChildren: () =>
          import('../../components/delegation/delegation.module').then(
            (m) => m.DelegationPageModule
          ),
      },
      {
        path: 'detail/:cab',
        loadChildren: () =>
          import('../../components/detail/detail.module').then(
            (m) => m.DetailPageModule
          ),
      },
      {
        path: 'liste-colis',
        loadChildren: () =>
          import('../../components/liste-colis/liste-colis.module').then(
            (m) => m.ListeColisPageModule
          ),
      },
      {
        path: 'livraison/all',
        loadChildren: () =>
          import('../../components/livraison/livraison.module').then(
            (m) => m.LivraisonPageModule
          ),
      },
      {
        path: 'ville',
        loadChildren: () =>
          import('../../components/ville/ville.module').then(
            (m) => m.VillePageModule
          ),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
