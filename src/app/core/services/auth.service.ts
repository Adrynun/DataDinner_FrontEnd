import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  login(username: string, password: string): Observable<boolean> {
    // Mock de ejemplo: usuario admin / pass 1234
    if (username === 'admin' && password === '1234') {
      this.isAuthenticated = true;
      return of(true).pipe(delay(500));
    } else {
      return throwError(() => new Error('Credenciales inválidas'));
    }
  }

  logout() {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
