import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CauseAnnulerPage } from './cause-annuler.page';

const routes: Routes = [
  {
    path: '',
    component: CauseAnnulerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CauseAnnulerPageRoutingModule {}
