import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EquipeListPageRoutingModule } from './equipe-list-routing.module';

import { EquipeListPage } from './equipe-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EquipeListPageRoutingModule
  ],
  declarations: [EquipeListPage]
})
export class EquipeListPageModule {}
