import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateEmployeeDTO, EmployeeResponse } from '../interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private http: HttpClient = inject(HttpClient);
  private baseUrl: string = environment.baseUrl;

  index(page: number = 0): Observable<EmployeeResponse> {
    const url: string = `${this.baseUrl}/api/employees/page/${page}`;
    return this.http.get<EmployeeResponse>(url);
  }

  store(createEmployeeDTO: CreateEmployeeDTO): Observable<EmployeeResponse> {
    const url: string = `${this.baseUrl}/api/employees`;
    return this.http.post<EmployeeResponse>(this.baseUrl, createEmployeeDTO);
  }

  show(term: string): Observable<EmployeeResponse> {
    const url: string = `${this.baseUrl}/api/employees/${term}`;
    return this.http.get<EmployeeResponse>(url);
  }

  destroy(id: string): Observable<EmployeeResponse> {
    const url: string = `${this.baseUrl}/api/employees/${id}`;
    return this.http.delete<EmployeeResponse>(url);
  }
}
