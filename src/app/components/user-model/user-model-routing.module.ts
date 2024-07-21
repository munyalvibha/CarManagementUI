import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserModelComponent } from './user-model.component';

const routes: Routes = [
  {
    path: "",
    component: UserModelComponent,
    children: [
      {
        path: "",
        component: DashboardComponent
      },
      {
        path: "dashboard",
        component: DashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserModelRoutingModule { }
