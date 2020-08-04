import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InspecaoServicoFormPage } from './inspecao-servico-form.page';

const routes: Routes = [
  {
    path: '',
    component: InspecaoServicoFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InspecaoServicoFormPageRoutingModule {}
