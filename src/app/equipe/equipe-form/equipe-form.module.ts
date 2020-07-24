import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EquipeFormPageRoutingModule } from './equipe-form-routing.module';

import { EquipeFormPage } from './equipe-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EquipeFormPageRoutingModule
  ],
  declarations: [EquipeFormPage]
})
export class EquipeFormPageModule {}
