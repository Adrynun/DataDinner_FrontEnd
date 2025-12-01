import { Injectable } from '@angular/core';
import { Producto } from '../../shared/models/producto.model';
import { Pedido } from '../../shared/models/pedido.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {

  private apiUrl = `${environment.apiUrl}/pedidos`;

  private pedidos: { [idMesa: number]: Pedido } = {};
  private pedidosSubject = new BehaviorSubject<{ [idMesa: number]: Pedido }>(this.pedidos);

  getPedidos(): Observable<{ [idMesa: number]: Pedido }> {
    return this.pedidosSubject.asObservable();
  }

  agregarProducto(idMesa: number, producto: Producto) {
    if (!this.pedidos[idMesa]) {
      this.pedidos[idMesa] = {
        id: Date.now(),
        idMesa,
        productos: [],
        total: 0,
        estado: 'PENDIENTE',
      };
    }

    // Añadir producto
    this.pedidos[idMesa].productos.push(producto);

    // Calcular total real
    this.pedidos[idMesa].total = this.pedidos[idMesa].productos
      .reduce((acc, p) => acc + p.precio, 0);

    // Notificar cambios
    this.pedidosSubject.next(this.pedidos);
  }

  obtenerPedido(idMesa: number): Pedido {
    return this.pedidos[idMesa] || {
      id: Date.now(),
      idMesa,
      productos: [],
      total: 0,
      estado: 'PENDIENTE',
    };
  }
}
