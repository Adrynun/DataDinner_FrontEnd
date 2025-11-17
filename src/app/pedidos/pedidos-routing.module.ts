import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidosComponent } from './pedidos/pedidos.component';
import { PedidosListComponent } from './pedidos/pedidos-list/pedidos-list.component';
import { PedidoDetalleComponent } from './pedidos/pedidos-detalle/pedidos-detalle.component';
import { ProductosListComponent } from './pedidos/productos-list/productos-list.component';

const routes: Routes = [
  { path: ':idMesa', component: PedidosComponent },
  { path: ':idMesa/detalle/:idPedido', component: PedidoDetalleComponent},
  { path: ':idMesa/productos', component: ProductosListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
