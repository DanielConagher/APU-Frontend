import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  HttpHeaders
} from '@angular/common/http';

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

  getContenido(
    idContenido: number
  ) {

    return this.http.get<Contenido>(
      `http://localhost:8080/contenido/${idContenido}`
    );
  }

  crearComentario(
    idContenido: number,
    comentario: string
  ) {

    const token =
      localStorage.getItem(
        'token'
      );

    return this.http.post(

      `http://localhost:8080/comentario/${idContenido}`,

      {
        comentario
      },

      {
        headers:
          new HttpHeaders({

            Authorization:
              `Bearer ${token}`

          })
      }
    );
  }
}