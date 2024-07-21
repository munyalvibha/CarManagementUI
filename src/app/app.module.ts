import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarModelComponent } from './components/car-model/car-model.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserModelComponent } from './components/user-model/user-model.component';
import { AdminAuthGuard } from './guards/admin.guard';
import { UserAuthGuard } from './guards/user.guard';
import { UserService } from './services/user.service';
import { LoginModelComponent } from './components/login-module/login-module.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpHeaderInterceptor } from './interceptor/header.interceptoe';

@NgModule({
  declarations: [
    AppComponent,
    LoginModelComponent,
    CarModelComponent,
    UserModelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [UserService, UserAuthGuard, AdminAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeaderInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
