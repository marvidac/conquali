import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InspecaoNaoConformidadeFormPageRoutingModule } from './inspecao-nao-conformidade-form-routing.module';

import { InspecaoNaoConformidadeFormPage } from './inspecao-nao-conformidade-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InspecaoNaoConformidadeFormPageRoutingModule
  ],
  declarations: [InspecaoNaoConformidadeFormPage]
})
export class InspecaoNaoConformidadeFormPageModule {}
