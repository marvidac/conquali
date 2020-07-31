import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InspecaoEquipeFormPageRoutingModule } from './inspecao-equipe-form-routing.module';

import { InspecaoEquipeFormPage } from './inspecao-equipe-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InspecaoEquipeFormPageRoutingModule
  ],
  declarations: [InspecaoEquipeFormPage]
})
export class InspecaoEquipeFormPageModule {}
