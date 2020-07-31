import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InspecaoEquipeFormPage } from './inspecao-equipe-form.page';

const routes: Routes = [
  {
    path: '',
    component: InspecaoEquipeFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InspecaoEquipeFormPageRoutingModule {}
