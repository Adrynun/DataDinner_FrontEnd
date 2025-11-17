import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pedidos-list',
  templateUrl: './pedidos-list.component.html',
  styleUrls: ['./pedidos-list.component.scss'],
})
export class PedidosListComponent {
  idMesa!: number;
  pedidos = [
    { id: 1, estado: 'ABIERTO', total: 12.5 },
    { id: 2, estado: 'SERVIDO', total: 30.0 },
  ];
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.idMesa = Number(this.route.snapshot.paramMap.get('idMesa'));
  }

  irADetalle(idPedido: number) {
    this.router.navigate(['/pedidos', this.idMesa, 'detalle', idPedido]);
  }

  irANuevoPedido() {
    this.router.navigate(['/pedidos', this.idMesa, 'productos']);
  }
}
