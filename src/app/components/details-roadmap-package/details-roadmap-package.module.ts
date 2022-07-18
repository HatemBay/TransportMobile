import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsRoadmapPackagePageRoutingModule } from './details-roadmap-package-routing.module';

import { DetailsRoadmapPackagePage } from './details-roadmap-package.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsRoadmapPackagePageRoutingModule
  ],
  declarations: [DetailsRoadmapPackagePage]
})
export class DetailsRoadmapPackagePageModule {}
