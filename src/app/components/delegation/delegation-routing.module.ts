import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DelegationPage } from './delegation.page';

const routes: Routes = [
  {
    path: '',
    component: DelegationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DelegationPageRoutingModule {}
