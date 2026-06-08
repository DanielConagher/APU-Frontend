import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { AuthService }
from '../../services/auth.service';

@Component({

  selector: 'app-register',

  standalone: true,

  imports: [

    FormsModule,

    CommonModule,

    RouterModule

  ],

  templateUrl: './register.html',

  styleUrl: './register.css'

})
export class RegisterComponent {

  primerNombre = '';

  segundoNombre = '';

  primerApellido = '';

  segundoApellido = '';

  correo = '';

  contrasena = '';

  edad = 18;

  esPadre = false;

  idUbicacion = 1;

  discapacidades: number[] = [];

  error = '';

  mensaje = '';

  cargando = false;

  constructor(
    private authService: AuthService
  ) {}

  registrar(): void {

    this.error = '';

    this.mensaje = '';

    this.cargando = true;

    this.authService.registrar({

      primerNombre: this.primerNombre,

      segundoNombre: this.segundoNombre,

      primerApellido: this.primerApellido,

      segundoApellido: this.segundoApellido,

      esPadre: this.esPadre,

      edad: this.edad,

      idUbicacion: this.idUbicacion,

      correo: this.correo,

      contrasena: this.contrasena,

      discapacidades: this.discapacidades

    }).subscribe({

      next: () => {

        this.mensaje =
          'Registro exitoso';

        this.cargando = false;
      },

      error: (err) => {

        this.cargando = false;

        if (err.error?.mensaje) {

          this.error =
            err.error.mensaje;

        }

        else if (
          typeof err.error === 'object'
        ) {

          this.error =
            Object.values(
              err.error
            ).join('\n');
        }

        else {

          this.error =
            'Ha ocurrido un error inesperado';
        }
      }
    });
  }
}