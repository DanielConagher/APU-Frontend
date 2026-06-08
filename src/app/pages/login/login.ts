import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  correo = '';

  contrasena = '';

  error = '';

  mensaje = '';

  cargando = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  iniciarSesion(): void {

    this.error = '';

    this.mensaje = '';

    this.cargando = true;

    this.authService.login({

      correo: this.correo,

      contrasena: this.contrasena

    }).subscribe({

      next: (response) => {

        localStorage.setItem(
          'token',
          response.token
        );

        localStorage.setItem(
          'correo',
          response.correo
        );

        localStorage.setItem(
          'rol',
          response.rol
        );

        localStorage.setItem(
          'nombreCompleto',
          response.nombreCompleto
        );

        localStorage.setItem(
          'idUsuario',
          response.idUsuario.toString()
        );

        this.router.navigate(
          ['/home']
        );
      },

      error: (err) => {

        console.error(err);

        this.cargando = false;

        /*
         * RuntimeException
         */
        if (err.error?.mensaje) {

          this.error =
            err.error.mensaje;

        }

        /*
         * Validaciones @Valid
         */
        else if (
          err.error &&
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