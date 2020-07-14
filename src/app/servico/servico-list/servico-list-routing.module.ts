import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicoListPage } from './servico-list.page';

const routes: Routes = [
  {
    path: '',
    component: ServicoListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicoListPageRoutingModule {}
