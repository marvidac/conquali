import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InspecaoServicoFormPageRoutingModule } from './inspecao-servico-form-routing.module';

import { InspecaoServicoFormPage } from './inspecao-servico-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InspecaoServicoFormPageRoutingModule
  ],
  declarations: [InspecaoServicoFormPage]
})
export class InspecaoServicoFormPageModule {}
