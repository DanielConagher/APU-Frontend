import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MaterialPersonalizado {

  idMaterialPersonalizado: number;

  nombre: string;

  cantidad: number;

  conseguido: boolean;

}

export interface MochilaPersonalizada {

  porcentajeCompletado: number;

  materiales: MaterialPersonalizado[];

}

@Injectable({
  providedIn: 'root'
})
export class MochilaPersonalizadaService {

  private api =
    'http://localhost:8080/api/mochila-personalizada';

  constructor(
    private http: HttpClient
  ) { }

  obtenerMochila(idEstudiante: number):
    Observable<MochilaPersonalizada> {

    return this.http.get<MochilaPersonalizada>(
      `${this.api}/${idEstudiante}`
    );

  }

}