import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesmanComponent } from './salesman/salesman.component';
import { CarModelListComponent } from './car-model-list/car-model-list.component';
import { CarModelComponent } from './car-model.component';

const routes: Routes = [
  {
    path: '',
    component: CarModelComponent,
    children: [
      {
        path: '',
        component: CarModelListComponent,
      },
      {
        path: 'car-list',
        component: CarModelListComponent,
      },
      {
        path: 'salesman',
        component: SalesmanComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarsModelRoutingModule { }
