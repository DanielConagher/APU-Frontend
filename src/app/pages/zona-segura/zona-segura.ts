import { Component, OnInit } from '@angular/core';
import { Ubicacion } from '../../services/ubicacion.service';
import {
  ZonaSeguraService,
  ZonaSegura
} from '../../services/zona-segura.service';
import { UbicacionService } from '../../services/ubicacion.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../components/navbar/navbar';
import { FooterComponent } from '../../components/footer/footer';


@Component({
  selector: 'app-zona-segura',
  imports: [
    CommonModule,
    FormsModule,
    Navbar,
    FooterComponent
],
  templateUrl: './zona-segura.html',
  styleUrl: './zona-segura.css',
})
export class ZonaSeguraComponent implements OnInit {
  zonas: ZonaSegura[] = [];

  zonasFiltradas: ZonaSegura[] = [];

  ubicaciones: Ubicacion[] = [];

  nombreBuscar = '';

  ubicacionSeleccionada = 0;

  constructor(

    private zonaService: ZonaSeguraService,

    private ubicacionService: UbicacionService

  ) { }

  ngOnInit(): void {

    this.cargarZonas();

    this.cargarUbicaciones();

  }

  cargarZonas() {

    this.zonaService.obtenerZonas()

      .subscribe({

        next: data => {

          this.zonas = data;

          this.zonasFiltradas = data;

        }

      });

  }

  cargarUbicaciones() {

    this.ubicacionService.obtenerUbicaciones()

      .subscribe({

        next: data => {

          this.ubicaciones = data;

        }

      });

  }

  filtrar() {

    this.zonasFiltradas = this.zonas.filter(z => {

      const coincideNombre =

        z.nombre
          .toLowerCase()
          .includes(
            this.nombreBuscar.toLowerCase()
          );

      const coincideUbicacion =

        this.ubicacionSeleccionada === 0 ||

        z.idUbicacion === this.ubicacionSeleccionada;

      return coincideNombre && coincideUbicacion;

    });

  }
}
