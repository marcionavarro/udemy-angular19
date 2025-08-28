import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoriaComponent} from './categoria/categoria.component';
import {LayoutComponent} from '../template/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule {
}
