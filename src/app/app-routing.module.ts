import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'funcionario', pathMatch: 'full' },

  { path: 'funcionario', loadChildren: './funcionario/funcionario-list/funcionario-list.module#FuncionarioListPageModule', pathMatch: 'full' },
  { path: 'funcionario/new', loadChildren: './funcionario/funcionario-form/funcionario-form.module#FuncionarioFormPageModule', pathMatch: 'full' },
  { path: 'funcionario/edit/:id', loadChildren: './funcionario/funcionario-form/funcionario-form.module#FuncionarioFormPageModule', pathMatch: 'full' },

  { path: 'servico', loadChildren: './servico/servico-list/servico-list.module#ServicoListPageModule', pathMatch: 'full' },
  { path: 'servico/new', loadChildren: './servico/servico-form/servico-form.module#ServicoFormPageModule', pathMatch: 'full' },
  { path: 'servico/edit/:id', loadChildren: './servico/servico-form/servico-form.module#ServicoFormPageModule', pathMatch: 'full' },
  
  { path: 'item', loadChildren: './item/item-list/item-list.module#ItemListPageModule', pathMatch: 'full' },
  { path: 'item/new', loadChildren: './item/item-form/item-form.module#ItemFormPageModule', pathMatch: 'full' },
  { path: 'item/edit/:id', loadChildren: './item/item-form/item-form.module#ItemFormPageModule', pathMatch: 'full' },

  { path: 'equipe', loadChildren: './equipe/equipe-list/equipe-list.module#EquipeListPageModule', pathMatch: 'full' },
  { path: 'equipe/new', loadChildren: './equipe/equipe-form/equipe-form.module#EquipeFormPageModule', pathMatch: 'full' },
  { path: 'equipe/edit/:id', loadChildren: './equipe/equipe-form/equipe-form.module#EquipeFormPageModule', pathMatch: 'full' },

  {
    path: 'equipe-form',
    loadChildren: () => import('./equipe/equipe-form/equipe-form.module').then( m => m.EquipeFormPageModule)
  },
  {
    path: 'equipe-list',
    loadChildren: () => import('./equipe/equipe-list/equipe-list.module').then( m => m.EquipeListPageModule)
  },
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
