import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InspecaoItemFormPageRoutingModule } from './inspecao-item-form-routing.module';

import { InspecaoItemFormPage } from './inspecao-item-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InspecaoItemFormPageRoutingModule
  ],
  declarations: [InspecaoItemFormPage]
})
export class InspecaoItemFormPageModule {}
