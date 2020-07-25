import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocalFormPageRoutingModule } from './local-form-routing.module';

import { LocalFormPage } from './local-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocalFormPageRoutingModule
  ],
  declarations: [LocalFormPage]
})
export class LocalFormPageModule {}
