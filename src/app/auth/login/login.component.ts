import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../core/services/usuario.service';
import { Usuario } from '../../shared/models/usuario.model';
import { AuthService } from '../../core/services/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuarioSeleccionado: Usuario | null = null;
  pin: string = '';
  pinDisplay: string = '';
  isLoading: boolean = false; 

  constructor(
    private usuarioService: UsuarioService, 
    private authService: AuthService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.isLoading = true;
    this.usuarioService.getUsuarios().pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(data => this.usuarios = data);
   
  }

  seleccionarUsuario(usuario: Usuario) {
    this.usuarioSeleccionado = usuario;
    this.pin = '';
    this.pinDisplay = ' '; 
  }

  cancelar() {
    this.usuarioSeleccionado = null;
    this.pin = '';
    this.pinDisplay = ' ';
  }

  // Lógica de pulsación de tecla numérica
  digitar(num: number) {
    if (!this.usuarioSeleccionado || this.isLoading) {
        return;
    }
    if (this.pin.length < 6) { 
      this.pin += num.toString();
      this.pinDisplay += '•'; 
    }
  }
  
  // Lógica para borrar el último dígito
  borrar() {
    if (this.isLoading) return;
    this.pin = this.pin.slice(0, -1);
    this.pinDisplay = this.pinDisplay.slice(0, -1);
  }

  login() {
    if (!this.usuarioSeleccionado || this.pin.length < 2) {
        alert('Por favor, selecciona un usuario e introduce el PIN completo.');
        return;
    }
    
    this.isLoading = true;
    
    const nombre = this.usuarioSeleccionado.nombreUsuario; 
    
    this.authService.login(nombre, this.pin).pipe( 
        finalize(() => this.isLoading = false) 
    ).subscribe({
        next: (response) => {
            console.log('Login exitoso, navegando al salón...');
            this.router.navigate(['/salon']);
        },
        error: err => {
            console.error('Error en login:', err);
            alert('PIN o credenciales incorrectas. Vuelve a intentarlo.');
            this.pin = ''; 
            this.pinDisplay = '';
        }
    });
}
}