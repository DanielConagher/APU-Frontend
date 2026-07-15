import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalisisComentariosService } from '../../services/analisis-comentarios.service';
import { FormsModule } from '@angular/forms';
import { ContenidoAdmin } from '../../models/contenido-admin.model';
import { ContenidoService } from '../../services/contenido.service';

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
export class AdminContenidosComponent implements OnInit {


  contenidos: ContenidoAdmin[] = [];

  contenidoSeleccionado?: ContenidoAdmin;

  resumen = '';

  mostrarModal = false;

  cargando = false;


  constructor(

    private contenidoService: ContenidoService,

    private analisisService: AnalisisComentariosService

  ) { }

  ngOnInit() {

    this.contenidoService

      .listarContenidos()

      .subscribe({

        next: (data) => {

          this.contenidos = data;

        }

      });

  }

  generarResumen() {

    if (!this.contenidoSeleccionado) {
      alert("Seleccione primero un contenido");
      return;

    }

    this.cargando = true;

    this.analisisService

      .generarResumen(

        this.contenidoSeleccionado.idContenido

      )

      .subscribe({

        next: (respuesta) => {

          this.resumen = respuesta;

          this.mostrarModal = true;

          this.cargando = false;

        },

        error: (error) => {

          alert(

            error.error ||

            "Error"

          );

          this.cargando = false;

        }

      });

  }



  cerrarModal() {

    this.mostrarModal = false;

  }

  seleccionarContenido(contenido: ContenidoAdmin) {

    this.contenidoSeleccionado = contenido;

  }
}
