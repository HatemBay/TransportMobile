import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsRoadmapPackagePage } from './details-roadmap-package.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsRoadmapPackagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsRoadmapPackagePageRoutingModule {}
