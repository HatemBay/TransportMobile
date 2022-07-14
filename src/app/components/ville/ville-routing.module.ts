import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VillePage } from './ville.page';

const routes: Routes = [
  {
    path: '',
    component: VillePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VillePageRoutingModule {}
