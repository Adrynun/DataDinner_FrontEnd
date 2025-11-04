export type EstadoMesa = 'LIBRE' | 'OCUPADA' | 'RESERVADA';

export interface Mesa {
  id: number;
  numero: number;
  capacidad: number;
  estado: EstadoMesa;
  x?: number;
  y?: number;
}