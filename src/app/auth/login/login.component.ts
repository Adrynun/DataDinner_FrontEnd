import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { Usuario } from 'src/app/shared/models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuarioSeleccionado: Usuario | null = null;
  pin: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    // Temporal: datos simulados
    this.usuarios = [
      {
        id: 1,
        nombre: 'Ana',
        rol: 'Camarera',
        avatarUrl: 'assets/avatars/ana.png',
      },
      {
        id: 2,
        nombre: 'Luis',
        rol: 'Cocinero',
        avatarUrl: 'assets/avatars/luis.png',
      },
      {
        id: 3,
        nombre: 'Sara',
        rol: 'Encargada',
        avatarUrl: 'assets/avatars/sara.png',
      },
    ];

    // Cuando tengas backend:
    // this.usuarioService.getUsuarios().subscribe(data => this.usuarios = data);
  }

  seleccionarUsuario(usuario: Usuario) {
    this.usuarioSeleccionado = usuario;
    this.pin = '';
  }

  cancelar() {
    this.usuarioSeleccionado = null;
    this.pin = '';
  }

  login() {
    console.log('Intentando login con PIN:', this.pin);
    if (this.pin === '1234') {
      console.log('PIN correcto, navegando al salón...');
      localStorage.setItem('usuario', JSON.stringify(this.usuarioSeleccionado));
      this.router.navigate(['/salon']);
    } else {
      alert('PIN incorrecto');
    }
  }
}
