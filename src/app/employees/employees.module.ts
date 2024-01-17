import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { EmployeesRoutingModule } from './employees-routing.module';
import { PostLayoutPageComponent } from './layout/post-layout-page/post-layout-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { PaginatorComponent } from '../shared/components/paginator/paginator.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PostLayoutPageComponent,
    HomePageComponent,
    CreatePageComponent,
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    HttpClientModule
  ]
})
export class EmployeesModule { }
