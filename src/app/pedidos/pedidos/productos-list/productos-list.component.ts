import { Component, Input } from '@angular/core';
import { Producto } from '../../../shared/models/producto.model';
import { PedidoService } from '../../../core/services/pedido.service';

@Component({
  selector: 'app-productos-list',
  templateUrl: './productos-list.component.html',
  styleUrls: ['./productos-list.component.scss'],
})
export class ProductosListComponent {
  @Input() mesaId!: number;
  productos: Producto[] = [
    { id: 1, nombre: 'Pizza', precio: 10 },
    { id: 2, nombre: 'Ensalada', precio: 5 },
    { id: 3, nombre: 'Sopa', precio: 6 },
    { id: 4, nombre: 'Refresco', precio: 2 },
  ];

  constructor(private pedidoService: PedidoService) {}

  agregarProducto(producto: Producto) {
    this.pedidoService.agregarProducto(this.mesaId, producto);
  }
}
