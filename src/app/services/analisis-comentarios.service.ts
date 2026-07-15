import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnalisisComentariosService {


  private apiUrl =
    'http://localhost:8080/analisis';


  constructor(
    private http: HttpClient
  ) { }


  generarResumen(
    idContenido:number
  ){

    const token =
      localStorage.getItem('token');


    return this.http.get(

      `${this.apiUrl}/${idContenido}`,

      {
        headers:
          new HttpHeaders({

            Authorization:
              `Bearer ${token}`

          }),

        responseType:'text'

      }

    );

  }

}