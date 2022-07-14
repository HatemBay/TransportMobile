import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VillePageRoutingModule } from './ville-routing.module';

import { VillePage } from './ville.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VillePageRoutingModule
  ],
  declarations: [VillePage]
})
export class VillePageModule {}
