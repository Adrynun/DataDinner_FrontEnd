import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mesa } from '../../shared/models/mesa.model';
import { MesaService } from '../../core/services/mesa.service';

@Component({
  selector: 'app-salon',
  templateUrl: './salon.component.html',
  styleUrls: ['./salon.component.scss'],
})
export class SalonComponent implements OnInit {
  mesas: Mesa[] = [];
  cargando = false;
  errorCarga = '';

  constructor(private mesaService: MesaService, private router: Router) {}

  ngOnInit(): void {
    this.cargarMesas();
  }

  cargarMesas() {
    this.cargando = true;
    this.mesaService.getMesas().subscribe({
      next: (mesas) => {
        this.mesas = mesas;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error cargando mesas:', err);
        // Fallback a datos locales si el backend no responde
        this.mesas = [
          { id: 1, numero: 1, capacidad: 4, estado: 'LIBRE', x: 100, y: 100 },
          { id: 2, numero: 2, capacidad: 2, estado: 'OCUPADA', x: 260, y: 100 },
          { id: 3, numero: 3, capacidad: 6, estado: 'RESERVADA', x: 100, y: 260 },
          { id: 4, numero: 4, capacidad: 4, estado: 'LIBRE', x: 260, y: 260 }
        ];
        this.errorCarga = 'No se pudo cargar mesas del servidor — usando datos de ejemplo';
        this.cargando = false;
      }
    });
  }

  irAPedido(idMesa: number) {
    this.router.navigate(['/pedidos', idMesa]);
  }
}
