import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404/error404.component';
import { Error500PageComponent } from './shared/pages/error500/error500.component';
import { canActivatedGuard, canMatchGuard } from './auth/guards/auth.guard';
import { canActivatedPublicGuard, canMatchPublicGuard } from './auth/guards/public.guard';

const routes: Routes = [
  {
    path: 'employees',
    loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule),
    canActivate: [canActivatedGuard],
    canMatch: [canMatchGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    canActivate: [canActivatedGuard],
    canMatch: [canMatchGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [canActivatedPublicGuard],
    canMatch: [canMatchPublicGuard]
  },
  {
    path: '404',
    component: Error404PageComponent
  },
  {
    path: '500',
    component: Error500PageComponent
  },
  {
    path: '**',
    redirectTo: '404'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
