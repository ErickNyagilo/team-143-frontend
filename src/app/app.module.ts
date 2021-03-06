import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DataTablesModule } from 'angular-datatables';

import { AppComponent } from "./app.component";
import { LoginComponent } from "./auth/login/login.component";
import { NavbarComponent } from "./navigation/navbar.component";
import { CheckinComponent } from "./auth/checkin/checkin.component";
import { RouterModule, } from "@angular/router";
import { UserModule } from "./modules/user.module";
import { AuthService, AlertsService } from './services';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  AuthGuard,
  LoginGuard
} from './guards';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CheckinComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: "login", canActivate: [LoginGuard], component: LoginComponent },
      { path: "checkin" , component: CheckinComponent, canActivate: [AuthGuard]},
      { path: "", redirectTo: "login", pathMatch: "full"},
      { path: "**", redirectTo: "login", pathMatch: "full"},
      {path: "user", canActivate: [AuthGuard], loadChildren: "./user/user.module#UserModule"}
    ]),
    UserModule,
    FontAwesomeModule,
    HttpClientModule,
    CommonModule,
    DataTablesModule
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    AuthService,
    AuthGuard,
    LoginGuard,
    AlertsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
