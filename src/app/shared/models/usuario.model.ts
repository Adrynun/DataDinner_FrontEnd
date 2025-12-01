export interface Usuario {
  id: number;
  nombre: string;
  nombreUsuario: string;
  rol: 'ADMIN' | 'CAMARERO'; 
  avatarUrl: string;
}
