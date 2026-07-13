import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Navbar } from '../../components/navbar/navbar';
import { FooterComponent } from '../../components/footer/footer';

import {
  MochilaPersonalizadaService,
  MaterialPersonalizado
} from '../../services/mochila-personalizada.service';

import {
  MochilaService,
  MaterialMochila
} from '../../services/mochila.service';


@Component({
  selector: 'app-mochila-emergencia',
  standalone: true,
  imports: [
    CommonModule,
    Navbar,
    FooterComponent
  ],
  templateUrl: './mochila-emergencia.html',
  styleUrl: './mochila-emergencia.css'
})
export class MochilaEmergenciaComponent implements OnInit {

  porcentaje = 0;

  tipoMochila: 'general' | 'personalizada' = 'general';

  materialesGeneral: MaterialMochila[] = [];

  materialesPersonalizados: MaterialPersonalizado[] = [];

  materialesMostrados: any[] = [];


  idEstudiante!: number;



  constructor(
    private mochilaService: MochilaService,
    private mochilaPersonalizadaService: MochilaPersonalizadaService
  ) { }



  ngOnInit(): void {


    const idUsuario =
      localStorage.getItem('idUsuario');


    if (idUsuario) {

      this.idEstudiante =
        Number(idUsuario);


      this.cargarMochilaGeneral();

      this.cargarMochilaPersonalizada();

    } else {

      console.error(
        "No existe usuario autenticado"
      );

    }

  }





  cargarMochilaGeneral() {


    this.mochilaService
      .obtenerMochila(this.idEstudiante)
      .subscribe({

        next: (data) => {

          this.materialesGeneral = data.materiales;

          if (this.tipoMochila === 'general') {

            this.materialesMostrados = this.materialesGeneral;

            this.porcentaje = data.porcentajeCompletado;

          }
        },

        error: (err) => {

          console.error(
            "Error cargando mochila",
            err
          );

        }

      });


  }

  cargarMochilaPersonalizada() {

    this.mochilaPersonalizadaService
      .obtenerMochila(this.idEstudiante)
      .subscribe({

        next: (data) => {

          this.materialesPersonalizados = data.materiales;

          if (this.tipoMochila === 'personalizada') {

            this.materialesMostrados =
              this.materialesPersonalizados;

            this.porcentaje =
              data.porcentajeCompletado;

          }

        }

      });

  }





  cambiarEstado(material: any) {

    material.conseguido = !material.conseguido;

  }



  guardarCambios() {

    if (this.tipoMochila !== 'general') {

      return;

    }

    this.mochilaService
      .actualizarMochila(

        this.idEstudiante,

        {

          materiales:
            this.materialesGeneral.map(material => ({

              idMaterial:
                material.idMaterial,

              conseguido:
                material.conseguido

            }))

        }

      )
      .subscribe({

        next: (data) => {

          this.materialesGeneral =
            data.materiales;

          this.materialesMostrados =
            this.materialesGeneral;

          this.porcentaje =
            data.porcentajeCompletado;

          alert("Mochila actualizada correctamente");

        },

        error: (err) => {

          console.error(
            "Error guardando mochila",
            err
          );

        }

      });

  }

  seleccionarGeneral() {

    this.tipoMochila = 'general';

    this.cargarMochilaGeneral();

  }

  seleccionarPersonalizada() {

    this.tipoMochila = 'personalizada';

    this.cargarMochilaPersonalizada();

  }

}