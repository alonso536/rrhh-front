import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { EmployeeResponse } from '../../employees/interfaces';
import { CreateUserDTO } from '../../auth/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http: HttpClient = inject(HttpClient);
  private authService: AuthService = inject(AuthService);

  private baseUrl: string = environment.baseUrl;
  private headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authService.token });

  index(page: number): Observable<EmployeeResponse> {
    const url: string = `${this.baseUrl}/api/users/page/${page}`;
    return this.http.get<EmployeeResponse>(url, { headers: this.headers });
  }

  show(id: number): Observable<EmployeeResponse> {
    const url: string = `${this.baseUrl}/api/users/${id}`;
    return this.http.get<EmployeeResponse>(url, { headers: this.headers });
  }

  destroy(id: number): Observable<EmployeeResponse> {
    const url: string = `${this.baseUrl}/api/users/${id}`;
    return this.http.delete<EmployeeResponse>(url, { headers: this.headers });
  }
}
