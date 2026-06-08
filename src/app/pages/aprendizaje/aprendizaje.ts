import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

import { RouterLink } from '@angular/router';

import { Navbar } from '../../components/navbar/navbar';

import { FooterComponent } from '../../components/footer/footer';

import {
  ProgresoService
} from '../../services/progreso.service';

import {
  ProgresoAprendizaje
} from '../../models/progreso-aprendizaje';

@Component({

  selector: 'app-aprendizaje',

  standalone: true,

  imports: [
    CommonModule,
    RouterLink,
    Navbar,
    FooterComponent
  ],

  templateUrl: './aprendizaje.html',

  styleUrls: ['./aprendizaje.css']

})
export class AprendizajeComponent {

  desastres:
    ProgresoAprendizaje[] = [];

  nombreCompleto =
    localStorage.getItem(
      'nombreCompleto'
    ) ?? '';

  constructor(

    private progresoService:
      ProgresoService,

    private router:
      Router

  ) {}

  ngOnInit(): void {

    this.progresoService
      .obtenerProgreso()
      .subscribe({

        next: (data) => {

          this.desastres = data;

        },

        error: (err) => {

          console.error(err);

        }
      });
  }

  abrirMapa(
    idTipoDesastre: number
  ): void {

    this.router.navigate([
      '/mapa-aprendizaje',
      idTipoDesastre
    ]);
  }

  obtenerClase(
    index: number
  ): string {

    const clases = [

      'sismos',
      'incendios',
      'inundaciones',
      'tormentas',
      'volcanes'

    ];

    return clases[
      index % clases.length
    ];
  }

  obtenerIcono(
    nombre: string
  ): string {

    const texto =
      nombre.toLowerCase();

    if (
      texto.includes('terremoto')
      ||
      texto.includes('sismo')
    ) {

      return 'fa-solid fa-house-crack';
    }

    if (
      texto.includes('incendio')
    ) {

      return 'fa-solid fa-fire';
    }

    if (
      texto.includes('inund')
    ) {

      return 'fa-solid fa-house-flood-water';
    }

    if (
      texto.includes('torment')
    ) {

      return 'fa-solid fa-cloud-bolt';
    }

    if (
      texto.includes('volc')
    ) {

      return 'fa-solid fa-volcano';
    }

    return 'fa-solid fa-triangle-exclamation';
  }
}