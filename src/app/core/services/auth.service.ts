// app/core/services/auth.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    this.isAuthenticatedSubject.next(!!localStorage.getItem('auth_token'));
  }

  login(nombreUsuario: string, pin: string): Observable<any> {
    const url = `${environment.apiUrl}/auth/login`;

    const credentials = { nombreUsuario: nombreUsuario, pass: pin };

    return this.http.post<any>(url, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('auth_token', response.token || 'dummy_token'); // Usa un token real si el backend lo devuelve
        localStorage.setItem('user_name', nombreUsuario); // Guardamos el nombre para la sesión
        this.isAuthenticatedSubject.next(true);
      }),
    );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('usuario');
    this.isAuthenticatedSubject.next(false);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }
}
