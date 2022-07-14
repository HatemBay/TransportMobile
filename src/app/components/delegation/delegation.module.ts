import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DelegationPageRoutingModule } from './delegation-routing.module';

import { DelegationPage } from './delegation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DelegationPageRoutingModule
  ],
  declarations: [DelegationPage]
})
export class DelegationPageModule {}
