import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mesa } from 'src/app/shared/components/mesa-item/mesa-item.component';
import { MesaService } from 'src/app/core/services/mesa.service';

@Component({
  selector: 'app-salon',
  templateUrl: './salon.component.html',
  styleUrls: ['./salon.component.scss'],
})
export class SalonComponent implements OnInit {
  mesas: Mesa[] = [];

  constructor(private mesaService: MesaService, private router: Router) {}

  ngOnInit(): void {
    this.cargarMesas();
  }

  cargarMesas() {
    // Por ahora simulamos datos; luego conectaremos al backend
    this.mesas = [
      { id: 1, nombre: 'Mesa 1', capacidad: 4, estado: 'disponible' },
      { id: 2, nombre: 'Mesa 2', capacidad: 2, estado: 'ocupada' },
      { id: 3, nombre: 'Mesa 3', capacidad: 6, estado: 'reservada' },
      { id: 4, nombre: 'Mesa 4', capacidad: 4, estado: 'disponible' },
    ];

    // Si quieres consumir el backend, sería algo así:
    // this.mesaService.getMesas().subscribe(mesas => this.mesas = mesas);
  }

  irAPedido(idMesa: number) {
    this.router.navigate(['/pedidos', idMesa]);
  }
}
