import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { City, CreateEmployeeDTO, Job } from '../../interfaces';
import { EmployeeService } from '../../services/employee.service';
import Swal from 'sweetalert2';
import { catchError, of } from 'rxjs';

@Component({
  templateUrl: './create-page.component.html',
  styleUrl: './create-page.component.css'
})
export class CreatePageComponent implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private employeeService: EmployeeService = inject(EmployeeService);
  private router: Router = inject(Router);

  public title: string = 'Add Employee';
  public errors: string[] = [];

  public jobs: Job[] = [];
  public cities: City[] = [];

  public myForm: FormGroup = this.formBuilder.group({
    name: [ '', [ Validators.required, Validators.minLength(3), Validators.maxLength(25) ] ],
    lastname: [ '', [ Validators.required, Validators.minLength(3), Validators.maxLength(25) ] ],
    email: [ '', [ Validators.required, Validators.email ] ],
    phone: [0, [ Validators.required ] ],
    birthdate: [ '', Validators.required ],
    job: [ '', Validators.required ],
    street: [ '', Validators.required ],
    number: [ '', Validators.required ],
    city: [ '', Validators.required ],
  });

  ngOnInit(): void {
    this.employeeService.jobs()
      .subscribe(response => this.jobs = response.payload);

    this.employeeService.cities()
      .subscribe(response => this.cities = response.payload);
  }

  isValidField(field: string) {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  onSubmit(): void {
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const createEmployeeDTO: CreateEmployeeDTO = this.myForm.value as CreateEmployeeDTO;

    this.employeeService.store(createEmployeeDTO)
    .pipe(
      catchError(response => of(response.error))
    ).subscribe(response => {
      if(response.errors) {
        this.errors = response.errors;
        return;
      }

      this.router.navigate(['/employees/home']);
      Swal.fire(
        'Employee added',
        'The employee has been added succesfully',
        'success'
      );
    });
  }
}
