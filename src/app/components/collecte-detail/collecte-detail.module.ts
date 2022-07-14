import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CollecteDetailPageRoutingModule } from './collecte-detail-routing.module';

import { CollecteDetailPage } from './collecte-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CollecteDetailPageRoutingModule
  ],
  declarations: [CollecteDetailPage]
})
export class CollecteDetailPageModule {}
