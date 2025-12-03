import { Component, Input } from '@angular/core';
import { Pedido } from '../../../shared/models/pedido.model';
import { Producto } from '../../../shared/models/producto.model';

interface ProductoAgrupado {
  producto: Producto;
  cantidad: number;
  subtotal: number;
}

@Component({
  selector: 'app-pedidos-detalle',
  templateUrl: './pedidos-detalle.component.html',
  styleUrls: ['./pedidos-detalle.component.scss'],
})
export class PedidoDetalleComponent {
  @Input() pedido: Pedido | undefined;

  get productosAgrupados(): ProductoAgrupado[] {
    if (!this.pedido?.productos) return [];

    const map = new Map<number, ProductoAgrupado>();

    for (const p of this.pedido.productos) {
      if (map.has(p.id)) {
        const existing = map.get(p.id)!;
        existing.cantidad++;
        existing.subtotal += p.precio;
      } else {
        map.set(p.id, { producto: p, cantidad: 1, subtotal: p.precio });
      }
    }

    return Array.from(map.values());
  }

  get total(): number {
    return this.pedido?.productos?.reduce((acc, p) => acc + p.precio, 0) ?? 0;
  }

  eliminarProducto(productoId: number) {
    if (!this.pedido?.productos) return;

    const index = this.pedido.productos.findIndex((p) => p.id === productoId);
    if (index >= 0) {
      this.pedido.productos.splice(index, 1);
    }
  }
}
