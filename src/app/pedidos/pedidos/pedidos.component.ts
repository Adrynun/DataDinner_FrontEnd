import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.idMesa = Number(params.get('idMesa'));
      this.pedido = this.pedidoService.obtenerPedido(this.idMesa);
    });
  }

  categoriaSeleccionada(idCategoria: number) {
    this.categoriaId = idCategoria;
  }

  agregarProductoAlPedido(producto: Producto) {
    this.pedidoService.agregarProducto(this.idMesa, producto);
    this.pedido = this.pedidoService.obtenerPedido(this.idMesa);
  }

  volverAlSalon() {
    this.router.navigate(['/salon']);
  }

  cerrarSesion() {
    this.router.navigate(['/login']);
  }

  enviarPedido() {
    this.router.navigate(['/login']);
  }
  facturarPedido() {
    console.log(`Mesa ${this.idMesa}: Procesando pago y generando factura. El pedido se cerrará.`);
    // Aquí iría la llamada a facturaService.generarFactura(this.idMesa);
    
    // Al finalizar, volvemos al salón y la mesa debería estar libre.
    this.router.navigate(['/salon']);
  }
}
