import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { UserDTO } from '../../../auth/interfaces';

@Component({
  templateUrl: './error404.component.html',
  styleUrl: './error404.component.css'
})
export class Error404PageComponent {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  public user?: UserDTO;

  ngOnInit(): void {
    if(!this.authService.auth) {
      this.router.navigate(['/auth/login']);
    }
    this.user = this.authService.auth;
  }


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
