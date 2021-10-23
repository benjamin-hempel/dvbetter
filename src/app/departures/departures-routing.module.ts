import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeparturesPage } from './departures.page';

const routes: Routes = [
  {
    path: '',
    component: DeparturesPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeparturesPageRoutingModule {}
