import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarModelFormComponent } from './car-model-form/car-model-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarsModelRoutingModule } from './car-model-routing.modules';
import { SalesmanComponent } from './salesman/salesman.component';
import { CarModelListComponent } from './car-model-list/car-model-list.component';



@NgModule({
  declarations: [
    CarModelFormComponent,
    SalesmanComponent,
    CarModelListComponent
  ],
  imports: [
    CommonModule,
    CarsModelRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CarModelModule { }
