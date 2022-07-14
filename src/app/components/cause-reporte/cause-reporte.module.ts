import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CauseReportePageRoutingModule } from './cause-reporte-routing.module';

import { CauseReportePage } from './cause-reporte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CauseReportePageRoutingModule
  ],
  declarations: [CauseReportePage]
})
export class CauseReportePageModule {}
