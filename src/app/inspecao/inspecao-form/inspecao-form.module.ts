import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InspecaoFormPageRoutingModule } from './inspecao-form-routing.module';

import { InspecaoFormPage } from './inspecao-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InspecaoFormPageRoutingModule
  ],
  declarations: [InspecaoFormPage]
})
export class InspecaoFormPageModule {}
