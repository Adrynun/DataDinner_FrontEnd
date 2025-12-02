import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mesa } from '../../shared/models/mesa.model';
import { MesaService } from '../../core/services/mesa.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-salon',
  templateUrl: './salon.component.html',
  styleUrls: ['./salon.component.scss'],
})
export class SalonComponent implements OnInit {
  mesas: Mesa[] = [];
  cargando = false;
  errorCarga = '';
  mesaSeleccionadaParaAbrir: Mesa | null = null;
  comensalesInput: number = 1;

  constructor(
    private mesaService: MesaService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cargarMesas();
  }

  cargarMesas() {
    this.cargando = true;
    this.mesaService
      .getMesas()
      .pipe(finalize(() => (this.cargando = false)))
      .subscribe({
        next: (mesas) => {
          this.mesas = mesas;
        },
        error: (err) => {
          console.error('Error cargando mesas:', err);
          this.mesas = [
            { id: 1, numero: 1, capacidad: 4, estado: 'LIBRE', x: 100, y: 100 },
            {
              id: 2,
              numero: 2,
              capacidad: 2,
              estado: 'OCUPADA',
              x: 260,
              y: 100,
              comensales: 2,
            },
            {
              id: 3,
              numero: 3,
              capacidad: 6,
              estado: 'RESERVADA',
              x: 100,
              y: 260,
            },
            {
              id: 4,
              numero: 4,
              capacidad: 4,
              estado: 'PEDIR_CUENTA',
              x: 260,
              y: 260,
              comensales: 4,
            },
            {
              id: 5,
              numero: 5,
              capacidad: 8,
              estado: 'OCUPADA',
              x: 420,
              y: 100,
              comensales: 5,
            },
            { id: 6, numero: 6, capacidad: 2, estado: 'LIBRE', x: 420, y: 260 },
          ];
          this.errorCarga =
            'No se pudo cargar mesas del servidor — usando datos de ejemplo';
        },
      });
  }

  manejarClickMesa(mesa: Mesa) {
    if (mesa.estado === 'LIBRE') {
      this.mesaSeleccionadaParaAbrir = mesa;
      this.comensalesInput = 1;
    } else {
      this.irAPedido(mesa.id);
    }
  }

  abrirMesa() {
    const mesa = this.mesaSeleccionadaParaAbrir;
    if (
      !mesa ||
      this.comensalesInput <= 0 ||
      this.comensalesInput > mesa.capacidad
    ) {
      console.error('Datos de comensales no válidos.');
      return;
    }

    const mesaActualizada: Mesa = {
      ...mesa,
      estado: 'OCUPADA',
      comensales: this.comensalesInput,
    };

    this.mesaService.actualizarMesa(mesaActualizada).subscribe({
      next: () => {
        console.log(
          `Mesa ${mesa.numero} abierta con ${this.comensalesInput} comensales.`,
        );
        this.cancelarApertura();
        this.cargarMesas();
        this.router.navigate(['/pedidos', mesa.id]);
      },
      error: (err) => {
        console.error('Error al abrir la mesa:', err);
        alert('Error al actualizar la mesa en el servidor. Revisa la consola.');
        this.cancelarApertura();
      },
    });
  }

  cancelarApertura() {
    this.mesaSeleccionadaParaAbrir = null;
    this.comensalesInput = 1;
  }

  irAPedido(idMesa: number) {
    this.router.navigate(['/pedidos', idMesa]);
  }
  cerrarSesion() {
    this.router.navigate(['/login']);
  }
}
