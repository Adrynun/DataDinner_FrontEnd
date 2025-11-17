import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidosComponent } from './pedidos/pedidos.component';
import { PedidosListComponent } from './pedidos/pedidos-list/pedidos-list.component';
import { PedidoDetalleComponent } from './pedidos/pedidos-detalle/pedidos-detalle.component';
import { ProductosListComponent } from './pedidos/productos-list/productos-list.component';

@NgModule({
  declarations: [
    PedidosComponent,
    PedidosListComponent,
    PedidoDetalleComponent,  
    ProductosListComponent
  ],
  imports: [
    CommonModule,
    PedidosRoutingModule
  ]
})
export class PedidosModule { }
