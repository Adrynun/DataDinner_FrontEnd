import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MesaItemComponent } from './components/mesa-item/mesa-item.component';
import { ProductoCardComponent } from './components/producto-card/producto-card.component';

@NgModule({
  declarations: [
    MesaItemComponent,
    ProductoCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MesaItemComponent,
    ProductoCardComponent
  ]
})
export class SharedModule { }
