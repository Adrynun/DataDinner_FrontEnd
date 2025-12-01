import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PedidoService } from '../../core/services/pedido.service';
import { Pedido } from '../../shared/models/pedido.model';
import { Producto } from '../../shared/models/producto.model';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent implements OnInit {
  idMesa!: number;
  categoriaId!: number;
  pedido!: Pedido;

  constructor(
    private route: ActivatedRoute,
    private pedidoService: PedidoService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.idMesa = Number(params.get('idMesa'));
      this.pedido = {
        id: Date.now(),
        idMesa: this.idMesa,
        productos: [],
        total: 0,
        estado: 'PENDIENTE',
      };
      this.cargarPedido();
    });
  }

  cargarPedido() {
    this.pedido = this.pedidoService.obtenerPedido(this.idMesa);
  }

  agregarProducto(producto: Producto) {
    this.pedidoService.agregarProducto(this.idMesa, producto);
    this.cargarPedido();
  }

  categoriaSeleccionada(idCategoria: number) {
    this.categoriaId = idCategoria;
  }
  agregarProductoAlPedido(producto: Producto) {
    this.pedido.productos.push(producto);
    this.pedido.total = this.pedido.productos.reduce(
      (acc, p) => acc + p.precio,
      0,
    );
  }
}
