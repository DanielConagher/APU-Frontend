import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Contenido } from '../models/contenido.model';

@Injectable({
  providedIn: 'root'
})
export class ContenidoService {

  private apiUrl =
    'http://localhost:8080/contenido/1';

  constructor(
    private http: HttpClient
  ) { }

  getContenido(): Observable<Contenido> {
    return this.http.get<Contenido>(this.apiUrl);
  }
}