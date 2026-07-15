import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { FormsModule } from '@angular/forms';

import { Navbar } from '../../components/navbar/navbar';
import { FooterComponent } from '../../components/footer/footer';

import { CuestionarioService } from '../../services/cuestionario.service';

import { Cuestionario } from '../../models/cuestionario.model';

import {
  ResolverCuestionario,
  RespuestaUsuario
} from '../../models/resolver-cuestionario.model';
import { ResultadoCuestionario } from '../../models/resultado-cuestionario.model';

@Component({
  selector: 'app-cuestionario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Navbar,
    FooterComponent
  ],
  templateUrl: './cuestionario.html',
  styleUrl: './cuestionario.css'
})
export class CuestionarioComponent
  implements OnInit {

  cuestionario?: Cuestionario;

  idContenido!: number;

  idTipoDesastre!: number;

  mostrarResultado = false;

  resultado: ResultadoCuestionario | null = null;

  mensajeError = '';

  /*
   * Guarda la respuesta seleccionada
   * key = idPregunta
   * value = idRespuesta
   */
  respuestasSeleccionadas:
    { [idPregunta: number]: number } = {};

  cargando = false;

  constructor(

    private cuestionarioService: CuestionarioService,

    private route: ActivatedRoute,

    private router: Router

  ) { }

  ngOnInit(): void {

    this.idContenido = Number(

      this.route.snapshot.paramMap.get(
        'idContenido'
      )

    );

    this.idTipoDesastre = Number(

      this.route.snapshot.paramMap.get(
        'idTipoDesastre'
      )

    );

    this.cargarCuestionario();

  }

  cargarCuestionario(): void {

    this.cuestionarioService
      .obtenerCuestionario(
        this.idContenido
      )
      .subscribe({

        next: data => {

          this.cuestionario = data;

        },

        error: err => {

          console.error(err);

        }

      });

  }

  seleccionarRespuesta(

    idPregunta: number,

    idRespuesta: number

  ): void {

    this.respuestasSeleccionadas[
      idPregunta
    ] = idRespuesta;

  }

  resolver(): void {

    if (!this.cuestionario)
      return;

    // Validar que todas estén respondidas

    if (

      Object.keys(
        this.respuestasSeleccionadas
      ).length

      <

      this.cuestionario.preguntas.length

    ) {

      this.mensajeError =
        'Debes responder todas las preguntas antes de enviar el cuestionario.';

      return;

    }

    this.mensajeError = '';

    const respuestas: RespuestaUsuario[] =

      this.cuestionario.preguntas.map(

        pregunta => ({

          idPregunta:
            pregunta.idPregunta,

          idRespuestaSeleccionada:

            this.respuestasSeleccionadas[
            pregunta.idPregunta
            ]

        })

      );

    const request:
      ResolverCuestionario = {

      idCuestionario:
        this.cuestionario.idCuestionario,

      idContenido:
        this.idContenido,

      respuestas

    };

    this.cargando = true;

    this.cuestionarioService

      .resolverCuestionario(request)

      .subscribe({

        next: resultado => {

          this.cargando = false;

          this.resultado = resultado;

          this.mostrarResultado = true;

        },

        error: err => {

          this.cargando = false;

          console.error(err);

        }

      });

  }

  volver(): void {

    this.router.navigate([

      '/mapa-aprendizaje',

      this.idTipoDesastre

    ]);

  }

  volverMapa(): void {

    this.router.navigate([

      '/mapa-aprendizaje',

      this.idTipoDesastre

    ]);

  }

}