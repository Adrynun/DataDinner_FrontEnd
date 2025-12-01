import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MesaItemComponent } from './components/mesa-item/mesa-item.component';
import { ProductoCardComponent } from './components/producto-card/producto-card.component';
import { CategoriasListComponent } from './components/categorias-list/categorias-list.component';

@NgModule({
  declarations: [
    MesaItemComponent,
    ProductoCardComponent,
    CategoriasListComponent,
  
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MesaItemComponent,
    ProductoCardComponent,
    CategoriasListComponent
  ]
})
export class SharedModule { }
