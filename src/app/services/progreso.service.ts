import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';

import {
  ProgresoAprendizaje
} from '../models/progreso-aprendizaje';

@Injectable({
  providedIn: 'root'
})
export class ProgresoService {

  private apiUrl =
    'http://localhost:8080/progreso';

  constructor(
    private http: HttpClient
  ) { }

  obtenerProgreso():
    Observable<ProgresoAprendizaje[]> {

    const token =
      localStorage.getItem(
        'token'
      );

    const headers =
      new HttpHeaders({

        Authorization:
          `Bearer ${token}`

      });

    return this.http.get<
      ProgresoAprendizaje[]
    >(this.apiUrl, { headers });
  }

  completarContenido(
    idContenido: number
  ) {

    const token =
      localStorage.getItem(
        'token'
      );

    return this.http.post(

      'http://localhost:8080/progreso/completar',

      {
        idContenido
      },

      {
        headers:
          new HttpHeaders({

            Authorization:
              `Bearer ${token}`

          }),
          responseType: 'text'
      }

    );
  }
}