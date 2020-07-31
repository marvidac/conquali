import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InspecaoItemFormPage } from './inspecao-item-form.page';

const routes: Routes = [
  {
    path: '',
    component: InspecaoItemFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InspecaoItemFormPageRoutingModule {}
