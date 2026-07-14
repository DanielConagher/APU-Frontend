import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Navbar } from '../../components/navbar/navbar';
import { FooterComponent } from '../../components/footer/footer';

import { FormsModule } from '@angular/forms';

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
    FooterComponent,
    FormsModule
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

  mostrarModal = false;

  modoEdicion = false;

  materialEditando: MaterialPersonalizado | null = null;

  nombreMaterial = '';

  cantidadMaterial = 1;


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

    if (this.tipoMochila === 'general') {

      return;

    }

    this.mochilaPersonalizadaService
      .actualizarMaterial(

        material.idMaterialPersonalizado,

        {

          nombre: material.nombre,

          cantidad: material.cantidad,

          conseguido: material.conseguido

        }

      )
      .subscribe({

        next: (data) => {

          this.materialesPersonalizados =
            data.materiales;

          this.materialesMostrados =
            this.materialesPersonalizados;

          this.porcentaje =
            Number(data.porcentajeCompletado);

        }

      });

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

  agregarMaterial() {

    this.modoEdicion = false;

    this.materialEditando = null;

    this.nombreMaterial = '';

    this.cantidadMaterial = 1;

    this.mostrarModal = true;

  }

  editarMaterial(material: MaterialPersonalizado) {

    this.modoEdicion = true;

    this.materialEditando = material;

    this.nombreMaterial = material.nombre;

    this.cantidadMaterial = material.cantidad;

    this.mostrarModal = true;

  }

  eliminarMaterial(material: MaterialPersonalizado) {

    if (!confirm("¿Eliminar este material?")) {

      return;

    }

    this.mochilaPersonalizadaService
      .eliminarMaterial(

        material.idMaterialPersonalizado

      )
      .subscribe({

        next: (data) => {

          this.materialesPersonalizados =
            data.materiales;

          this.materialesMostrados =
            this.materialesPersonalizados;

          this.porcentaje =
            Number(data.porcentajeCompletado);

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

  cerrarModal() {

    this.mostrarModal = false;

  }

  guardarMaterial() {

    if (!this.nombreMaterial.trim()) {

      alert("Ingrese un nombre");

      return;

    }

    if (this.cantidadMaterial <= 0) {

      alert("La cantidad debe ser mayor que 0");

      return;

    }

    if (!this.modoEdicion) {

      this.mochilaPersonalizadaService
        .agregarMaterial(

          this.idEstudiante,

          {

            nombre: this.nombreMaterial,

            cantidad: this.cantidadMaterial

          }

        )
        .subscribe({

          next: (data) => {

            this.materialesPersonalizados =
              data.materiales;

            this.materialesMostrados =
              this.materialesPersonalizados;

            this.porcentaje =
              Number(data.porcentajeCompletado);

            this.cerrarModal();

          },

          error: (err) => {

            console.error(err);

          }

        });

    }

    else {

      this.mochilaPersonalizadaService
        .actualizarMaterial(

          this.materialEditando!.idMaterialPersonalizado,

          {

            nombre: this.nombreMaterial,

            cantidad: this.cantidadMaterial,

            conseguido: this.materialEditando!.conseguido

          }

        )
        .subscribe({

          next: (data) => {

            this.materialesPersonalizados =
              data.materiales;

            this.materialesMostrados =
              this.materialesPersonalizados;

            this.porcentaje =
              Number(data.porcentajeCompletado);

            this.cerrarModal();

          },

          error: (err) => {

            console.error(err);

          }

        });

    }

  }

}