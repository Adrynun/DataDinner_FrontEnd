import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from '../../core/services/pedido.service';
import { Pedido } from '../../shared/models/pedido.model';
import { Producto } from '../../shared/models/producto.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent implements OnInit {
  idMesa!: number;
  categoriaId!: number;
  pedido$!: Observable<Pedido>;
  // Estado para el botón de envío
  enviandoPedido = false;

  constructor(
    private route: ActivatedRoute,
    private pedidoService: PedidoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.idMesa = Number(params.get('idMesa'));
      this.pedido$ = this.pedidoService.obtenerPedidoObservable(this.idMesa);
    });
  }

  categoriaSeleccionada(idCategoria: number) {
    this.categoriaId = idCategoria;
  }

  agregarProductoAlPedido(producto: Producto) {
    this.pedidoService.agregarProducto(this.idMesa, producto);
  }

  volverAlSalon() {
    this.router.navigate(['/salon']);
  }

  cerrarSesion() {
    this.router.navigate(['/login']);
  }

  enviarPedido() {
    this.enviandoPedido = true;

    // 1. Obtener la instantánea del pedido (el valor actual del observable en memoria)
    const pedidoActual = this.pedidoService.obtenerPedido(this.idMesa);

    if (pedidoActual.productos.length === 0) {
      console.warn('No se puede enviar un pedido vacío.');
      this.enviandoPedido = false;
      return;
    }

    // 2. Llamar al servicio para enviar al backend
    this.pedidoService.enviarPedidoAlBackend(pedidoActual).subscribe({
      next: (pedidoEnviado) => {
        console.log(`Pedido ${pedidoEnviado.id} enviado y confirmado.`);
      },
      error: (err) => {
        console.error('Error al enviar el pedido:', err);
        this.enviandoPedido = false; // Detener la carga en caso de error
      },
      complete: () => {
        this.enviandoPedido = false;
        // CAMBIO CLAVE: Navegar al salón después del envío exitoso
        this.router.navigate(['/login']);
      },
    });
  }

  facturarPedido() {
    console.log(
      `Mesa ${this.idMesa}: Procesando pago y generando factura. El pedido se cerrará.`,
    ); // Aquí iría la llamada a facturaService.generarFactura(this.idMesa);
    // Al finalizar, volvemos al salón y la mesa debería estar libre.
    this.router.navigate(['/salon']);
  }
}
