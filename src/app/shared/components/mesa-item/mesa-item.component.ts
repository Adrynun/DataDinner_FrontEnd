import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface Mesa {
  id: number;
  nombre: string;
  capacidad: number;
  estado: 'disponible' | 'ocupada' | 'reservada';
}

@Component({
  selector: 'app-mesa-item',
  templateUrl: './mesa-item.component.html',
  styleUrls: ['./mesa-item.component.scss']
})
export class MesaItemComponent {

  @Input() mesa!: Mesa;
  @Output() mesaClick = new EventEmitter<number>();

  onClick() {
    this.mesaClick.emit(this.mesa.id);
  }

  getClaseEstado() {
    switch (this.mesa.estado) {
      case 'disponible': return 'mesa-disponible';
      case 'ocupada': return 'mesa-ocupada';
      case 'reservada': return 'mesa-reservada';
      default: return '';
    }
  }

}
