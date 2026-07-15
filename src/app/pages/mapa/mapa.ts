import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MapaService } from '../../services/mapa.service';
import { MapaAprendizaje } from '../../models/mapa-aprendizaje';
import { Navbar } from '../../components/navbar/navbar';
import { FooterComponent } from '../../components/footer/footer';

import { MapaPersonalizado }
  from '../../models/mapa-personalizado';

@Component({
  selector: 'app-mapa-aprendizaje',
  standalone: true,
  imports: [CommonModule,
    Navbar,
    FooterComponent
  ],
  templateUrl: './mapa.html',
  styleUrl: './mapa.css'
})
export class MapaAprendizajeComponent {

  burbujas: any[] = [];

  niveles: any[][] = [];

  modoMapa: 'general' | 'personalizado' = 'general';

  nombreDesastre: string = '';

  idTipoDesastre = 0;

  tipoMapa:
    'general' | 'personalizado'
    =
    'general';

  nombreCompleto =
    localStorage.getItem(
      'nombreCompleto'
    ) ?? '';

  constructor(
    private mapaService: MapaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.idTipoDesastre = Number(
      this.route.snapshot.paramMap.get('idTipoDesastre')



    );



    this.nombreDesastre = this.obtenerNombreDesastre(this.idTipoDesastre);

    this.cargarMapa();



  }

  cargarMapa(): void {


    if (this.modoMapa === 'general') {


      this.mapaService
        .obtenerMapa(this.idTipoDesastre)
        .subscribe(data => {

          this.burbujas = data;

          this.niveles =
            this.agruparPorNivel(data);

        });


    }
    else {


      this.mapaService
        .obtenerMapaPersonalizado(
          this.idTipoDesastre
        )
        .subscribe(data => {


          this.burbujas = data;

          this.niveles =
            this.agruparPorNivel(data);


        });


    }

  }

  cambiarMapa(
    modo: 'general' | 'personalizado'
  ) {

    this.modoMapa = modo;

    this.cargarMapa();

  }

  private agruparPorNivel(data: MapaAprendizaje[]): MapaAprendizaje[][] {

    const mapa = new Map<number, MapaAprendizaje[]>();

    data.forEach(item => {

      if (!mapa.has(item.numeroNivel)) {
        mapa.set(item.numeroNivel, []);
      }

      mapa.get(item.numeroNivel)!.push(item);
    });

    // ordenado por numeroNivel
    return Array.from(mapa.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([_, contenidos]) =>
        contenidos.sort((a, b) => a.posicion - b.posicion)
      );
  }

  abrirContenido(
    burbuja: any
  ): void {


    if (burbuja.estado === 0)
      return;



    if (burbuja.esCuestionario) {


      this.router.navigate([

        '/cuestionario',

        burbuja.idContenido,

        this.idTipoDesastre

      ]);


    }

    else {


      if (this.modoMapa === 'general') {


        this.router.navigate([

          '/contenido',

          burbuja.idContenido,

          this.idTipoDesastre

        ]);


      }
      else {


        this.router.navigate([

          '/contenido-personalizado',

          burbuja.idContenido,

          this.idTipoDesastre

        ]);


      }


    }


  }

  volver(): void {
    this.router.navigate(['/aprendizaje']);
  }

  private obtenerNombreDesastre(id: number): string {

    switch (id) {

      case 1:
        return 'Terremoto';

      case 2:
        return 'Inundacion';

      case 3:
        return 'Huayco';

      case 4:
        return 'Deslizamiento';

      default:
        return 'Desastre natural';
    }
  }
}