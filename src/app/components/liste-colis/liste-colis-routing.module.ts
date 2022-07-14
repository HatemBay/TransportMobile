import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeColisPage } from './liste-colis.page';

const routes: Routes = [
  {
    path: '',
    component: ListeColisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListeColisPageRoutingModule {}
