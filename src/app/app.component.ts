import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DataDinner-frontend';
  constructor(
    public authService: AuthService,
    private router: Router
  ){}

  logout(){
    this.authService.logout();
    this.router.navigate(['auth/login']);
  }
}
