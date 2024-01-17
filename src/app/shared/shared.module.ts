import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404PageComponent } from './pages/error404/error404.component';
import { Error500PageComponent } from './pages/error500/error500.component';



@NgModule({
  declarations: [
    Error404PageComponent,
    Error500PageComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
