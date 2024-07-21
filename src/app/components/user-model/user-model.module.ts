import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserModelRoutingModule } from './user-model-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    UserModelRoutingModule
  ]
})
export class UserModelModule { }
