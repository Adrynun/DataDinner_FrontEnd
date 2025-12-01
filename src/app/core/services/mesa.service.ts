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

  private apiUrl = `${environment.apiUrl}/mesas`;

  constructor(private http: HttpClient) { }

  getMesas(): Observable<Mesa[]> {
    return this.http.get<Mesa[]>(this.apiUrl);
  }

  getMesa(id: number): Observable<Mesa> {
    return this.http.get<Mesa>(`${this.apiUrl}/${id}`);
  }

  actualizarMesa(mesa: Mesa) {
    return this.http.put<Mesa>(`${this.apiUrl}/${mesa.id}`, mesa);
  }
}
