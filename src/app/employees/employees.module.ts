import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeeLayoutPageComponent } from './layout/employee-layout-page/employee-layout-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailsPageComponent } from './pages/details-page/details-page.component';


@NgModule({
  declarations: [
    EmployeeLayoutPageComponent,
    HomePageComponent,
    CreatePageComponent,
    PaginatorComponent,
    DetailsPageComponent,
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [
    HttpClientModule
  ]
})
export class EmployeesModule { }
