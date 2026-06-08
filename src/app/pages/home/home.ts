import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

import { RouterModule } from '@angular/router';

import { FooterComponent } from '../../components/footer/footer';

import { Navbar } from '../../components/navbar/navbar';

import {
  ProgresoService
} from '../../services/progreso.service';

import {
  ProgresoAprendizaje
} from '../../models/progreso-aprendizaje';

@Component({

  selector: 'app-home',

  standalone: true,

  imports: [
    CommonModule,
    RouterModule,
    FooterComponent,
    Navbar
  ],

  templateUrl: './home.html',

  styleUrl: './home.css'

})
export class HomeComponent {

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

  ) { }

  ngOnInit(): void {

    this.progresoService
      .obtenerProgreso()
      .subscribe({

        next: (data) => {

          this.desastres =
            data;

        },

        error: (err) => {

          console.error(
            err
          );
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

  obtenerIcono(
    nombre: string
  ): string {

    switch (
    nombre.toLowerCase()
    ) {

      case 'terremoto':
        return 'fa-solid fa-house-crack';

      case 'incendio':
        return 'fa-solid fa-fire';

      case 'inundacion':
        return 'fa-solid fa-house-flood-water';

      case 'tormenta':
        return 'fa-solid fa-cloud-bolt';

      case 'erupcion volcanica':
        return 'fa-solid fa-volcano';

      default:
        return 'fa-solid fa-triangle-exclamation';
    }
  }

  obtenerColor(
    nombre: string
  ): string {

    switch (
    nombre.toLowerCase()
    ) {

      case 'terremoto':
        return 'red';

      case 'incendio':
        return 'orange';

      case 'inundacion':
        return 'blue';

      case 'tormenta':
        return 'purple';

      case 'erupcion volcanica':
        return 'green';

      default:
        return 'blue';
    }
  }
}