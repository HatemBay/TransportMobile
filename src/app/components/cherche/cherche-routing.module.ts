import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CherchePage } from './cherche.page';

const routes: Routes = [
  {
    path: '',
    component: CherchePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CherchePageRoutingModule {}
