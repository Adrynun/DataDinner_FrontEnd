import { Producto } from './producto.model';

export interface Pedido {
  id: number;
  idMesa: number;
  productos: Producto[];
  total: number;
  estado: 'PENDIENTE' | 'CONFIRMADO' | 'ENTREGADO';
}
