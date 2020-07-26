import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InspecaoFormPage } from './inspecao-form.page';

const routes: Routes = [
  {
    path: '',
    component: InspecaoFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InspecaoFormPageRoutingModule {}
