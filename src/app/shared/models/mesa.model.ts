export type EstadoMesa = 'LIBRE' | 'OCUPADA' | 'RESERVADA' | 'PEDIR_CUENTA';

export interface Mesa {
  id: number;
  numero: number;
  capacidad: number;
  estado: EstadoMesa;
  x?: number;
  y?: number;
  comensales?: number;
}
