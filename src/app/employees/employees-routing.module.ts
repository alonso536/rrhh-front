import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeLayoutPageComponent } from './layout/employee-layout-page/employee-layout-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { canActivatedAdminGuard, canMatchAdminGuard } from '../auth/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: EmployeeLayoutPageComponent,
    children: [
      { path: 'home', component: HomePageComponent },
      { path: 'home/page/:page', component: HomePageComponent },
      { path: 'create', component: CreatePageComponent, canActivate: [canActivatedAdminGuard], canMatch: [canMatchAdminGuard] },
      { path: 'show/:id', component: DetailsPageComponent },
      { path: 'edit/:id', component: EditPageComponent, canActivate: [canActivatedAdminGuard], canMatch: [canMatchAdminGuard] },
      { path: '**', component: HomePageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
