import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface MaterialMochila {

  idMaterial: number;
  nombre: string;
  cantidad: number;
  conseguido: boolean;

}


export interface MochilaGeneral {

  porcentajeCompletado: number;
  materiales: MaterialMochila[];

}


export interface ActualizarMaterial {

  idMaterial: number;
  conseguido: boolean;

}


export interface ActualizarMochila {

  materiales: ActualizarMaterial[];

}



@Injectable({
  providedIn: 'root'
})
export class MochilaService {


  private apiUrl = 'http://localhost:8080/api/mochila-general';


  constructor(
    private http: HttpClient
  ) { }



  obtenerMochila(
    idEstudiante: number
  ): Observable<MochilaGeneral> {


    return this.http.get<MochilaGeneral>(
      `${this.apiUrl}/${idEstudiante}`
    );

  }




  actualizarMochila(
    idEstudiante: number,
    datos: ActualizarMochila
  ): Observable<MochilaGeneral> {


    return this.http.put<MochilaGeneral>(
      `${this.apiUrl}/${idEstudiante}`,
      datos
    );

  }

}