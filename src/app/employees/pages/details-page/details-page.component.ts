import { Component, OnInit, inject } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../interfaces';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.css'
})
export class DetailsPageComponent implements OnInit {

  private employeeService: EmployeeService = inject(EmployeeService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  public title: string = 'Show Employee';
  public employee?: Employee;

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
        });
    }
  );
  }
}
