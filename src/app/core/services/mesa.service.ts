// src/app/core/services/mesa.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mesa } from '../../shared/models/mesa.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  // Ajusta la URL base si tu backend usa otra ruta o puerto.
  // Podrías mover esto a environment.apiUrl si prefieres.
  private apiUrl = `${environment.apiUrl}/mesas`;

  constructor(private http: HttpClient) { }

  // Obtener todas las mesas
  getMesas(): Observable<Mesa[]> {
    return this.http.get<Mesa[]>(this.apiUrl);
  }

  // Opcional: obtener una mesa por id
  getMesa(id: number): Observable<Mesa> {
    return this.http.get<Mesa>(`${this.apiUrl}/${id}`);
  }

  // Opcional: actualizar estado / posiciones, etc.
  actualizarMesa(mesa: Mesa) {
    return this.http.put<Mesa>(`${this.apiUrl}/${mesa.id}`, mesa);
  }
}
