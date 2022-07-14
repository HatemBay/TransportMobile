import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CollectePageRoutingModule } from './collecte-routing.module';

import { CollectePage } from './collecte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CollectePageRoutingModule
  ],
  declarations: [CollectePage]
})
export class CollectePageModule {}
