import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Mesa } from '../../models/mesa.model';

@Component({
  selector: 'app-mesa-item',
  templateUrl: './mesa-item.component.html',
  styleUrls: ['./mesa-item.component.scss'],
})
export class MesaItemComponent {
  @Input() mesa!: Mesa;
  @Output() mesaClick = new EventEmitter<number>();

  onClick() {
    this.mesaClick.emit(this.mesa.id);
  }

  getClaseEstado() {
    switch (this.mesa.estado) {
      case 'LIBRE':
        return 'mesa-disponible';
      case 'OCUPADA':
        return 'mesa-ocupada';
      case 'RESERVADA':
        return 'mesa-reservada';
      default:
        return '';
    }
  }
}
