import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  public title: string = 'Log In';
  public username: string = '';
  public password: string = '';
  public errors: string[] = [];

  login() {
    this.authService.login(this.username, this.password)
      .subscribe(response => {
        if(response.errors) {
          this.errors = response.errors;
          return;
        }

        if(!response.token) return;

        this.authService.saveUser(response.token!);
        this.authService.checkAuthentication()
          .subscribe(isAuth => {
            console.log(isAuth);
            if(isAuth) {
              this.router.navigate(['/employees/home']);
              Swal.fire(
                'Login successful',
                response.message,
                'success'
              );
            }
          });
      });
  }
}
