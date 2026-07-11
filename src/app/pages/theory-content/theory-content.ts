import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContenidoService } from '../../services/contenido.service';
import { Contenido } from '../../models/contenido.model';
import { SafePipe } from '../../pipes/safe-pipe';
import { Navbar } from '../../components/navbar/navbar';
import { FooterComponent } from '../../components/footer/footer';
import { FormsModule } from '@angular/forms';
import { ProgresoService }
  from '../../services/progreso.service';
import {
  ActivatedRoute,
  Router
} from '@angular/router';

@Component({
  selector: 'app-theory-content',
  standalone: true,
  imports: [CommonModule,
    SafePipe,
    Navbar,
    FooterComponent,
    FormsModule
  ],
  templateUrl: './theory-content.html',
  styleUrls: ['./theory-content.css']
})
export class TheoryContentComponent
  implements OnInit {

  contenido?: Contenido;

  nuevoComentario = '';

  idContenido!: number;

  constructor(
    private contenidoService: ContenidoService,
    private route: ActivatedRoute,
    private router: Router,
    private progresoService: ProgresoService,
  ) { }

  ngOnInit(): void {

    this.idContenido = Number(
      this.route.snapshot.paramMap.get(
        'idContenido'
      )
    );

    this.cargarContenido();
  }


  cargarContenido(): void {

    this.contenidoService
      .getContenido(this.idContenido)
      .subscribe(data => {

        if (data.esCuestionario) {

          const idTipoDesastre = Number(
            this.route.snapshot.paramMap.get(
              'idTipoDesastre'
            )
          );

          this.router.navigate([

            '/cuestionario',

            this.idContenido,

            idTipoDesastre

          ]);

          return;

        }

        this.contenido = data;

      });
  }

  publicarComentario(): void {

    if (!this.nuevoComentario.trim()) {

      alert(
        'Debe escribir un comentario.'
      );

      return;
    }

    if (
      !this.nuevoComentario.trim()
    ) {

      alert(
        'El comentario no puede estar vacío.'
      );

      return;
    }

    if (
      this.nuevoComentario.trim().length < 3
    ) {

      alert(
        'Debe tener al menos 3 caracteres.'
      );

      return;
    }

    const regex =

      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9.,!?()¿¡\s]+$/;

    if (
      !regex.test(
        this.nuevoComentario
      )
    ) {

      alert(
        'Contiene caracteres no permitidos.'
      );

      return;
    }

    this.contenidoService
      .crearComentario(
        this.idContenido,
        this.nuevoComentario
      )
      .subscribe(() => {

        this.nuevoComentario = '';

        this.cargarContenido();

      });
  }

  volver(): void {

    const idTipoDesastre = Number(
      this.route.snapshot.paramMap.get(
        'idTipoDesastre'
      )
    );

    this.router.navigate([
      '/mapa-aprendizaje',
      idTipoDesastre
    ]);
  }

  siguiente(): void {

    this.progresoService
      .completarContenido(
        this.idContenido
      )
      .subscribe({

        next: () => {

          const idTipoDesastre =

            Number(

              this.route
                .snapshot
                .paramMap
                .get(
                  'idTipoDesastre'
                )

            );

          this.router.navigate([

            '/mapa-aprendizaje',
            idTipoDesastre

          ]);

        },

        error: (err) => {

          console.error(err);

        }

      });

  }
}