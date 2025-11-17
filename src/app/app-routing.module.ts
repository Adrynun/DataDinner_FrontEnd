import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'salon',  loadChildren: () => import('./salon/salon.module').then(m => m.SalonModule) },//canActivate: [AuthGuard],
  { path: 'pedidos',  loadChildren: () => import('./pedidos/pedidos.module').then(m => m.PedidosModule) }, //canActivate: [AuthGuard],
  { path: 'productos', canActivate: [AuthGuard], loadChildren: () => import('./productos/productos.module').then(m => m.ProductosModule) },
  { path: 'facturas', canActivate: [AuthGuard], loadChildren: () => import('./facturacion/facturacion.module').then(m => m.FacturacionModule) },
  { path: 'reportes', canActivate: [AuthGuard], loadChildren: () => import('./reportes/reportes.module').then(m => m.ReportesModule) },
  { path: '**', redirectTo: '/auth/login' },
  { path: 'pedidos', loadChildren: () => import('./pedidos/pedidos.module').then(m => m.PedidosModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
