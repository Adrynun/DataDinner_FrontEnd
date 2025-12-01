import {
  Component,
  Input,
  OnChanges,
  EventEmitter,
  Output,
} from '@angular/core';
import { ProductoService } from '../../../core/services/producto.service';
import { Producto } from '../../../shared/models/producto.model';

@Component({
  selector: 'app-productos-list',
  templateUrl: './productos-list.component.html',
  styleUrls: ['./productos-list.component.scss'],
})
export class ProductosListComponent implements OnChanges {
  @Input() categoriaId!: number;
  @Input() productosAgregados: Producto[] = [];
  @Output() productoSeleccionado = new EventEmitter<Producto>();

  productos: Producto[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnChanges(): void {
    if (this.categoriaId) {
      this.cargarProductos();
    }
  }

  cargarProductos() {
    this.productoService.getProductosPorCategoria(this.categoriaId).subscribe({
      next: (prods) => {
        this.productos = prods.map((p) => ({
          ...p,
          agregado: this.productosAgregados.some((pa) => pa.id === p.id),
        }));
      },
      error: (err) => console.error('Error cargando productos:', err),
    });
  }

  seleccionarProducto(producto: Producto) {
    this.productoSeleccionado.emit(producto);
    producto.agregado = true;
  }
}
