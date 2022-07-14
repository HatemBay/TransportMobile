import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeColisPageRoutingModule } from './liste-colis-routing.module';

import { ListeColisPage } from './liste-colis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeColisPageRoutingModule
  ],
  declarations: [ListeColisPage]
})
export class ListeColisPageModule {}
