import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreateUserDTO, User, UserDTO } from '../interfaces';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { EmployeeResponse } from '../../employees/interfaces';
import { AuthResponse } from '../interfaces/auth-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private httpHeaders: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  private user?: UserDTO;

  private http: HttpClient = inject(HttpClient);

  get token(): string {
    return sessionStorage.getItem('token') || '';
  }

  get auth(): UserDTO | undefined {
    return this.user;
  }

  checkAuthentication(): Observable<boolean> {
    if(!sessionStorage.getItem('token')) return of(false);

    const token = sessionStorage.getItem('token');

    return this.http.get<EmployeeResponse>(`${this.baseUrl}/api/users/check`, { headers: { 'Authorization': 'Bearer ' + token } })
      .pipe(
        tap(response => this.user = response.payload),
        map(user => !!user),
        catchError(err => of(false))
      );
  }

  isAdmin(): Observable<boolean> {
    if(!this.user) throw new Error(`User is not authenticated`);
    return of(this.user.isAdmin);
  }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, { username, password }, { headers: this.httpHeaders })
      .pipe(
        catchError(err => of(err.error as AuthResponse))
      );
  }

  register(user: CreateUserDTO): Observable<EmployeeResponse> {
    return this.http.post<EmployeeResponse>(`${this.baseUrl}/api/users/register`, user);
  }

  logout() {
    sessionStorage.clear();
  }

  saveUser(token: string) {
    sessionStorage.setItem('token', token);
  }

  // profile(): Observable<EmployeeResponse> {
  //   if(!this.user) throw new Error(`User is not authenticated`);

  //   const token = sessionStorage.getItem('token');
  //   const username = sessionStorage.getItem('username');
  //   return this.http.get<EmployeeResponse>(`${this.baseUrl}/api/users/${username}`, { headers: { 'Authorization': 'Bearer ' + token } });
  // }
}
