import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { UserDTO } from '../../../auth/interfaces';

@Component({
  templateUrl: './employee-layout-page.component.html',
  styleUrl: './employee-layout-page.component.css'
})
export class EmployeeLayoutPageComponent implements OnInit {

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  public user?: UserDTO;
  public isAdmin?: boolean;

  ngOnInit(): void {
    if(!this.authService.auth) {
      this.router.navigate(['/auth/login']);
    }

    this.authService.isAdmin()
      .subscribe(isAdmin => this.isAdmin = isAdmin);
      
    this.user = this.authService.auth;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
