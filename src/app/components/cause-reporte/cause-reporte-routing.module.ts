import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CauseReportePage } from './cause-reporte.page';

const routes: Routes = [
  {
    path: '',
    component: CauseReportePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CauseReportePageRoutingModule {}
