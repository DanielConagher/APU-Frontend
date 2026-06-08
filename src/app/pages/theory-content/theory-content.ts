import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContenidoService } from '../../services/contenido.service';
import { Contenido } from '../../models/contenido.model';
import { SafePipe } from '../../pipes/safe-pipe';
import { Navbar } from '../../components/navbar/navbar';
import { FooterComponent } from '../../components/footer/footer';
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
    FooterComponent
  ],
  templateUrl: './theory-content.html',
  styleUrls: ['./theory-content.css']
})
export class TheoryContentComponent
  implements OnInit {

  contenido?: Contenido;

  constructor(

    private contenidoService:
      ContenidoService,

    private route:
      ActivatedRoute,

    private router:
      Router

  ) { }

    nombreCompleto =
    localStorage.getItem(
      'nombreCompleto'
    ) ?? '';

  ngOnInit(): void {

    const idContenido =

      Number(

        this.route
          .snapshot
          .paramMap
          .get(
            'idContenido'
          )

      );

    this.contenidoService
      .getContenido(
        idContenido
      )
      .subscribe(data => {

        this.contenido =
          data;

      });
  }

  volver(): void {

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
  }
}
