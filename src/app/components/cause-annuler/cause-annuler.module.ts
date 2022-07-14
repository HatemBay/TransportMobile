import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CauseAnnulerPageRoutingModule } from './cause-annuler-routing.module';

import { CauseAnnulerPage } from './cause-annuler.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CauseAnnulerPageRoutingModule
  ],
  declarations: [CauseAnnulerPage]
})
export class CauseAnnulerPageModule {}
