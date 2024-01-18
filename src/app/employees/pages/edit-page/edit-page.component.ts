import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Employee, UpdateEmployeeDTO } from '../../interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.css'
})
export class EditPageComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private employeeService: EmployeeService = inject(EmployeeService);
  private router: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  public title: string = 'Edit Employee';
  public errors: string[] = [];
  public employee?: Employee;

  public myForm?: FormGroup;

  ngOnInit(): void {
    this.activatedRoute.paramMap
    .subscribe(params => {
      let id: number = +params.get('id')!;
      if(id < 0) {
        this.router.navigateByUrl("/404");
      };

      this.employeeService.show(id)
        .pipe(
          catchError(response => {
            this.router.navigateByUrl("/404");
            return of(response.error);
          })
        )
        .subscribe(response => {
          this.employee = response.payload;

          this.myForm = this.formBuilder.group({
            name: [ this.employee?.name, [ Validators.required, Validators.minLength(3), Validators.maxLength(25) ] ],
            lastname: [ this.employee?.lastname, [ Validators.required, Validators.minLength(3), Validators.maxLength(25) ] ],
            email: [ this.employee?.email, [ Validators.required, Validators.email ] ],
            phone: [ this.employee?.phone, [ Validators.required ] ],
          });
        });
    });
  }

  isValidField(field: string) {
    return this.myForm!.controls[field].errors && this.myForm!.controls[field].touched;
  }

  onSubmit(): void {
    if(this.myForm!.invalid) {
      this.myForm!.markAllAsTouched();
      return;
    }

    const updateEmployeeDTO: UpdateEmployeeDTO = this.myForm!.value as UpdateEmployeeDTO;

    this.employeeService.update(updateEmployeeDTO, this.employee!.id)
    .pipe(
      catchError(response => of(response.error))
    ).subscribe(response => {
      if(response.errors) {
        this.errors = response.errors;
        return;
      }

      this.router.navigate(['/employees/home']);
      Swal.fire(
        'Employee updated',
        'The employee has been updated succesfully',
        'success'
      );
    });
  }
}
