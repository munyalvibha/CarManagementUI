import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from './guards/admin.guard';
import { UserAuthGuard } from './guards/user.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./components/login-module/login-module.module').then((m) => m.loginModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./components/car-model/car-model.module').then(
        (m) => m.CarModelModule
      ),
    canActivate: [AdminAuthGuard],
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./components/user-model/user-model.module').then(
        (m) => m.UserModelModule
      ),
    canActivate: [UserAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
