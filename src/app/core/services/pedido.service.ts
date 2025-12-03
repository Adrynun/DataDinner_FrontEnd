import { Injectable } from '@angular/core';
import { Producto } from '../../shared/models/producto.model';
import { Pedido } from '../../shared/models/pedido.model';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, tap, map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private apiUrl = `${environment.apiUrl}/pedidos`;

  private pedidos: { [idMesa: number]: Pedido } = {};
  private pedidosSubject = new BehaviorSubject<{ [idMesa: number]: Pedido }>(
    this.pedidos,
  );

  constructor(private http: HttpClient) {}

  getPedidos(): Observable<{ [idMesa: number]: Pedido }> {
    return this.pedidosSubject.asObservable();
  }

  agregarProducto(idMesa: number, producto: Producto) {
    if (!this.pedidos[idMesa]) {
      this.pedidos[idMesa] = {
        id: Date.now(),
        idMesa,
        productos: [],
        total: 0,
        estado: 'PENDIENTE',
      };
    }

    this.pedidos[idMesa].productos.push(producto);

    this.pedidos[idMesa].total = this.pedidos[idMesa].productos.reduce(
      (acc, p) => acc + p.precio,
      0,
    );

    this.pedidosSubject.next({ ...this.pedidos });
  }

  obtenerPedido(idMesa: number): Pedido {
    return (
      this.pedidos[idMesa] || {
        id: Date.now(),
        idMesa,
        productos: [],
        total: 0,
        estado: 'PENDIENTE',
      }
    );
  }

  obtenerPedidoObservable(idMesa: number): Observable<Pedido> {
    return this.getPedidos().pipe(
      map(
        (pedidosMap: { [idMesa: number]: Pedido }) =>
          pedidosMap[idMesa] || {
            id: Date.now(),
            idMesa,
            productos: [],
            total: 0,
            estado: 'PENDIENTE',
          },
      ),
    );
  }

  enviarPedidoAlBackend(pedido: Pedido): Observable<Pedido> {
    console.log(
      `[SERVICE] Realizando POST a ${this.apiUrl} con pedido de Mesa ${pedido.idMesa}...`,
    );

    const pedidoAEnviar: Partial<Pedido> = { ...pedido };

    delete pedidoAEnviar.id;
    delete pedidoAEnviar.estado;

    pedidoAEnviar.productos = pedidoAEnviar.productos?.map((p) => {
      const productoLimpio: Partial<Producto> = { ...p };
      delete productoLimpio.id;
      return productoLimpio as Producto;
    });

    return this.http.post<Pedido>(this.apiUrl, pedidoAEnviar).pipe(
      tap((pedidoPersistido) => {
        this.pedidos[pedidoPersistido.idMesa] = pedidoPersistido;
        this.pedidosSubject.next({ ...this.pedidos });
        console.log(
          `[SERVICE] Pedido ${pedidoPersistido.id} de Mesa ${pedidoPersistido.idMesa} persistido en DB. Estado: ${pedidoPersistido.estado}`,
        );
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(
          `Error HTTP al enviar pedido: ${error.status} - ${error.statusText}`,
          error.error,
        );
        return throwError(
          () =>
            new Error(
              `Fallo al conectar con el servidor para guardar el pedido. Código: ${error.status}`,
            ),
        );
      }),
    );
  }
}
