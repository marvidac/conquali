import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InspecaoLocalFormPage } from './inspecao-local-form.page';

const routes: Routes = [
  {
    path: '',
    component: InspecaoLocalFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InspecaoLocalFormPageRoutingModule {}
