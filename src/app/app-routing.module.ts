import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'funcionario', pathMatch: 'full' },

  { path: 'funcionario', loadChildren: './funcionario/funcionario-list/funcionario-list.module#FuncionarioListPageModule', pathMatch: 'full' },
  { path: 'funcionario/new', loadChildren: './funcionario/funcionario-form/funcionario-form.module#FuncionarioFormPageModule', pathMatch: 'full' },
  { path: 'funcionario/edit/:id', loadChildren: './funcionario/funcionario-form/funcionario-form.module#FuncionarioFormPageModule', pathMatch: 'full' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
