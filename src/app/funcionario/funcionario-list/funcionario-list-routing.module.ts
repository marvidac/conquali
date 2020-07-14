import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FuncionarioListPage } from './funcionario-list.page';

const routes: Routes = [
  {
    path: '',
    component: FuncionarioListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuncionarioListPageRoutingModule {}
