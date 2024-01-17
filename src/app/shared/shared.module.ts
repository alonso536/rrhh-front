import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404PageComponent } from './pages/error404/error404.component';
import { Error500PageComponent } from './pages/error500/error500.component';
import { PaginatorComponent } from './components/paginator/paginator.component';



@NgModule({
  declarations: [
    Error404PageComponent,
    Error500PageComponent,
    PaginatorComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PaginatorComponent
  ]
})
export class SharedModule { }