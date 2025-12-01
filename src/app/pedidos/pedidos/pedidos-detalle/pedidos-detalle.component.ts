import { Component, Input, OnInit } from '@angular/core';
import { PedidoService } from '../../../core/services/pedido.service';
import { Pedido } from '../../../shared/models/pedido.model';

@Component({
  selector: 'app-pedidos-detalle',
  templateUrl: './pedidos-detalle.component.html',
  styleUrls: ['./pedidos-detalle.component.scss']
})
export class PedidoDetalleComponent implements OnInit {
  @Input() mesaId!: number;
  @Input() pedido!: Pedido;
  

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.pedido = this.pedidoService.obtenerPedido(this.mesaId);
  }
}
