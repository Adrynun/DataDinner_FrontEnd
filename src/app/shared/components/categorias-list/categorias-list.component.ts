import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoriaService } from '../../../core/services/categoria.service';
import { Categoria } from '../../models/categoria.model';

@Component({
  selector: 'app-categorias-list',
  templateUrl: './categorias-list.component.html',
  styleUrls: ['./categorias-list.component.scss']
})
export class CategoriasListComponent implements OnInit {
  categorias: Categoria[] = [];
  cargando = false;

  @Output() categoriaSeleccionada = new EventEmitter<number>();

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias() {
    console.log("Cargando categorías...");
    this.cargando = true;
    this.categoriaService.getCategorias().subscribe({
      next: (cats) => {
        this.categorias = cats;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        // Podríamos añadir fallback si hace falta
      }
    });
  }

  seleccionarCategoria(id: number) {
    this.categoriaSeleccionada.emit(id);
  }
}
