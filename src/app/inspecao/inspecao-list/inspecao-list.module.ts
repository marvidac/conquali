import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InspecaoListPageRoutingModule } from './inspecao-list-routing.module';

import { InspecaoListPage } from './inspecao-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InspecaoListPageRoutingModule
  ],
  declarations: [InspecaoListPage]
})
export class InspecaoListPageModule {}
