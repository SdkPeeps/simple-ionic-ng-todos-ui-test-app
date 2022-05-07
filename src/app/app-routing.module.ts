import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'todos',
    pathMatch: 'full'
  },

  {
    path: 'todos',
    loadChildren: () => import('todos-lib').then( m => m.TodosPageModule)
  },  {
    path: 'todo-view',
    loadChildren: () => import('./todo-view/todo-view.module').then( m => m.TodoViewPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
