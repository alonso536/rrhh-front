import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateEmployeeDTO, EmployeeResponse, UpdateEmployeeDTO } from '../interfaces';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private http: HttpClient = inject(HttpClient);
  private authService: AuthService = inject(AuthService);

  private baseUrl: string = environment.baseUrl;
  private headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authService.token });

  index(page: number): Observable<EmployeeResponse> {
    const url: string = `${this.baseUrl}/api/employees/page/${page}`;
    return this.http.get<EmployeeResponse>(url, { headers: this.headers });
  }

  store(createEmployeeDTO: CreateEmployeeDTO): Observable<EmployeeResponse> {
    const url: string = `${this.baseUrl}/api/employees`;
    return this.http.post<EmployeeResponse>(url, createEmployeeDTO, { headers: this.headers });
  }

  show(id: number): Observable<EmployeeResponse> {
    const url: string = `${this.baseUrl}/api/employees/${id}`;
    return this.http.get<EmployeeResponse>(url, { headers: this.headers });
  }

  update(updateEmployeeDTO: UpdateEmployeeDTO, id: number): Observable<EmployeeResponse> {
    const url: string = `${this.baseUrl}/api/employees/${id}`;
    return this.http.put<EmployeeResponse>(url, updateEmployeeDTO, { headers: this.headers });
  }

  destroy(id: number): Observable<EmployeeResponse> {
    const url: string = `${this.baseUrl}/api/employees/${id}`;
    return this.http.delete<EmployeeResponse>(url, { headers: this.headers });
  }

  jobs(): Observable<EmployeeResponse> {
    const url: string = `${this.baseUrl}/api/employees/jobs`;
    return this.http.get<EmployeeResponse>(url, { headers: this.headers });
  }

  cities(): Observable<EmployeeResponse> {
    const url: string = `${this.baseUrl}/api/employees/cities`;
    return this.http.get<EmployeeResponse>(url, { headers: this.headers });
  }
}
