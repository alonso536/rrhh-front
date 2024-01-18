import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

const checkIsAdmin = (): Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.isAdmin()
    .pipe(
      tap((isAdmin) => {
        if(!isAdmin) {
          router.navigate(['/employees/home'])
        }
      })
    );
}

export const canActivatedAdminGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return checkIsAdmin();
}

export const canMatchAdminGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
    return checkIsAdmin();
}