import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InspecaoNaoConformidadeFormPage } from './inspecao-nao-conformidade-form.page';

const routes: Routes = [
  {
    path: '',
    component: InspecaoNaoConformidadeFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InspecaoNaoConformidadeFormPageRoutingModule {}
