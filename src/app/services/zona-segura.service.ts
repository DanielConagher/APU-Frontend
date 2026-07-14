import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ZonaSegura {

  idZona: number;

  nombre: string;

  descripcion: string;

  idUbicacion: number;

  ubicacion: string;

}

@Injectable({
  providedIn: 'root'
})
export class ZonaSeguraService {

  private api =
    'http://localhost:8080/api/zonas-seguras';

  constructor(
    private http: HttpClient
  ) { }

  obtenerZonas():
    Observable<ZonaSegura[]> {

    return this.http.get<ZonaSegura[]>(this.api);

  }

}