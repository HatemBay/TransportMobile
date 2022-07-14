import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollecteDetailPage } from './collecte-detail.page';

const routes: Routes = [
  {
    path: '',
    component: CollecteDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollecteDetailPageRoutingModule {}
