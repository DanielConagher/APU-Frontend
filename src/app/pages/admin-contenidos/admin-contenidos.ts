import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalisisComentariosService } from '../../services/analisis-comentarios.service';
import { FormsModule } from '@angular/forms';

@Component({

  selector: 'app-admin-contenidos',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './admin-contenidos.html',

  styleUrls: [
    './admin-contenidos.css'
  ]

})
export class AdminContenidosComponent {


  idContenido: number = 1;


  resumen: string = '';

  mostrarModal = false;


  cargando = false;


  constructor(
    private analisisService:
      AnalisisComentariosService
  ) { }



  generarResumen() {


    this.cargando = true;


    this.analisisService

      .generarResumen(
        this.idContenido
      )

      .subscribe({

        next: (respuesta) => {


          this.resumen =
            respuesta;


          this.mostrarModal = true;


          this.cargando = false;

        },


        error: (error) => {


          console.error(error);


          alert(
            error.error
            ||
            'Error generando resumen'
          );


          this.cargando = false;

        }

      });


  }



  cerrarModal() {

    this.mostrarModal = false;

  }

}
