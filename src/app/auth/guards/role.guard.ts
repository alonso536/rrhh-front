// import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
// import { Observable, tap } from 'rxjs';
// import { AuthService } from '../services/auth.service';
// import { inject } from '@angular/core';

// const checkIsAdmin = (): boolean | Observable<boolean> => {
//   const service: AuthService = inject(AuthService);
//   const router: Router = inject(Router);

//   if(!service.isAdmin()) {
//     router.navigate(['/employees/home'])
//   }
// }

// export const canActivatedRoleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
//     return checkIsAdmin();
// }

// export const canMatchRoleGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
//     return checkIsAdmin();
// }