import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CreateUserDTO } from '../../interfaces';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  private formBuilder: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  public title: string = 'Register';
  public errors: string[] = [];

  public myForm: FormGroup = this.formBuilder.group({
    username: [ '', [ Validators.required, Validators.minLength(3), Validators.maxLength(25) ] ],
    email: [ '', [ Validators.required, Validators.email ] ],
    password: [ '', [ Validators.required, Validators.minLength(4), Validators.maxLength(16) ] ],
    confirmPassword: ['']
  },
  {
    validator: this.passwordMatchValidator
  }
  );

  isValidField(field: string) {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')!.value;
    const confirmPassword = group.get('confirmPassword')!.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const createUserDTO: CreateUserDTO = this.myForm.value as CreateUserDTO;

    this.authService.register(createUserDTO)
    .pipe(
      catchError(response => of(response.error))
    ).subscribe(response => {
      if(response.errors) {
        this.errors = response.errors;
        return;
      }

      this.router.navigate(['/auth/login']);
      Swal.fire(
        'Successful registry',
        'You have successfully registered',
        'success'
      );
    });
  }
}
