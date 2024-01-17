import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../interfaces';
import { PageResponse } from '../../../shared/interfaces/page-response.interface';
import { EmployeeService } from '../../services/employee.service';

@Component({
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  public title: string = 'Employees list';
  public employees: Employee[] = [];
  public page: number = 1;
  public paginator!: PageResponse<Employee>;

  public employeeService: EmployeeService = inject(EmployeeService);
  public activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .subscribe(params => {
        let page: number = +params.get('page')!;
        
        if(page != null) {
          this.page = page;
        };

        this.employeeService.index(page - 1)
          .subscribe(response => {
            this.paginator = response.payload;
            this.employees = response.payload.content;
          });
      }
    );    
    
  }
}