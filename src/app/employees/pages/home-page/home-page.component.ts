import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../interfaces';
import { PageResponse } from '../../../shared/interfaces/page-response.interface';
import { EmployeeService } from '../../services/employee.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  public title: string = 'Employees list';
  public employees: Employee[] = [];
  public page: number = 1;
  public paginator!: PageResponse<Employee>;
  public isAdmin?: boolean;

  public employeeService: EmployeeService = inject(EmployeeService);
  public authService: AuthService = inject(AuthService);
  public activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .subscribe(params => {
        let page: number = +params.get('page')!;
        if(page != 0) {
          this.page = page;
        };

        this.employeeService.index(this.page - 1)
          .subscribe(response => {
            this.paginator = response.payload;
            this.employees = response.payload.content;
          });
      }
    );

    this.authService.isAdmin()
      .subscribe(isAdmin => this.isAdmin = isAdmin);
  }

  destroy(employee: Employee): void {
    Swal.fire({
      title: 'Are you sure that want to delete this employee?',
      text: 'This action is irreversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#085d6',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeService.destroy(employee.id).subscribe(
          response => {
            this.employees = this.employees.filter(e => e.id != employee.id);
            Swal.fire(
              'Employeee deleted',
              'Employeee deleted successfully',
              'success'
            )
          }
        );
      }
    })
  }
}