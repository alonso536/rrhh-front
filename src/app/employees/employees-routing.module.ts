import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostLayoutPageComponent } from './layout/post-layout-page/post-layout-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';

const routes: Routes = [
  {
    path: '',
    component: PostLayoutPageComponent,
    children: [
      { path: 'home', component: HomePageComponent },
      { path: 'home/page/:page', component: HomePageComponent },
      { path: 'create', component: CreatePageComponent },
      { path: '**', component: HomePageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
