import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeLayoutPageComponent } from '../employees/layout/employee-layout-page/employee-layout-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeLayoutPageComponent,
    children: [
      { path: 'home', component: HomePageComponent },
      { path: 'home/page/:page', component: HomePageComponent },
      { path: 'show/:id', component: DetailsPageComponent },
      { path: '**', component: HomePageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
