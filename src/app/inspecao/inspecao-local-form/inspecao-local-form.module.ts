import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InspecaoLocalFormPageRoutingModule } from './inspecao-local-form-routing.module';

import { InspecaoLocalFormPage } from './inspecao-local-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InspecaoLocalFormPageRoutingModule
  ],
  declarations: [InspecaoLocalFormPage]
})
export class InspecaoLocalFormPageModule {}
