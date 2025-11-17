import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  login(username: string, password: string): Observable<boolean> {
  return of(true).pipe(
    delay(500),
    tap(() => this.isAuthenticatedSubject.next(true))
  );
}

  logout(): void {
    this.isAuthenticatedSubject.next(false);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
