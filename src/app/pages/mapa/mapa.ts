import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MapaService } from '../../services/mapa.service';
import { MapaAprendizaje } from '../../models/mapa-aprendizaje';
import { Navbar } from '../../components/navbar/navbar';
import { FooterComponent } from '../../components/footer/footer';

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

  burbujas: MapaAprendizaje[] = [];

  niveles: MapaAprendizaje[][] = [];

  nombreDesastre: string = '';

  idTipoDesastre = 0;

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

    this.mapaService.obtenerMapa(this.idTipoDesastre)
      .subscribe({
        next: data => {

          this.burbujas = data;

          // 🔥 AGRUPACIÓN REAL POR NIVEL
          this.niveles = this.agruparPorNivel(data);
        }
      });



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
      .map(x => x[1]);
  }

  abrirContenido(burbuja: MapaAprendizaje): void {

    if (burbuja.estado === 0) return;

    this.router.navigate([
      '/contenido',
      burbuja.idContenido,
      this.idTipoDesastre
    ]);
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