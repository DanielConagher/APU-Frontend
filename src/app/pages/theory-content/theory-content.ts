import { Component, OnDestroy, OnInit } from '@angular/core';
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

import { jsPDF } from 'jspdf';

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
  implements OnInit, OnDestroy {

  contenido?: Contenido;

  nuevoComentario = '';

  // ======== LECTOR DE VOZ ========

  private utterance?: SpeechSynthesisUtterance;

  leyendo = false;
  pausado = false;
  altoContraste = false;
  tamanoFuente = 16;

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

  leerTeoria(): void {

    if (!this.contenido?.teoria?.trim()) {

      alert('No hay teoría disponible para leer.');

      return;

    }

    // Detener cualquier lectura anterior
    speechSynthesis.cancel();

    this.utterance = new SpeechSynthesisUtterance(
      this.contenido.teoria
    );

    // Buscar una voz en español
    const voces = speechSynthesis.getVoices();

    const vozEspañol = voces.find(v =>
      v.lang.startsWith('es')
    );

    if (vozEspañol) {
      this.utterance.voice = vozEspañol;
    }

    this.utterance.lang = 'es-PE';
    this.utterance.rate = 0.95;
    this.utterance.pitch = 1;
    this.utterance.volume = 1;

    this.utterance.onstart = () => {

      this.leyendo = true;
      this.pausado = false;

    };

    this.utterance.onend = () => {

      this.leyendo = false;
      this.pausado = false;

    };

    this.utterance.onerror = () => {

      this.leyendo = false;
      this.pausado = false;

    };

    speechSynthesis.speak(this.utterance);

  }

  pausarLectura(): void {

    if (this.leyendo && !this.pausado) {

      speechSynthesis.pause();

      this.pausado = true;

    }

  }

  reanudarLectura(): void {

    if (this.leyendo && this.pausado) {

      speechSynthesis.resume();

      this.pausado = false;

    }

  }

  detenerLectura(): void {

    speechSynthesis.cancel();

    this.leyendo = false;
    this.pausado = false;

  }

  ngOnDestroy(): void {

    speechSynthesis.cancel();

  }

  descargarPDF(): void {

    if (!this.contenido?.teoria?.trim()) {
      return;
    }

    const pdf = new jsPDF();

    const margen = 20;

    let y = 20;

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);

    pdf.text("APU", margen, y);

    y += 10;

    pdf.setFontSize(13);

    pdf.text(
      "Aprendizaje para Personas con Discapacidad",
      margen,
      y
    );

    y += 15;

    pdf.setFontSize(16);

    pdf.text("Antecedentes", margen, y);

    y += 10;

    pdf.setFontSize(12);

    pdf.text(
      "Prevención de Desastres Naturales",
      margen,
      y
    );

    y += 15;

    pdf.setFont("helvetica", "bold");

    pdf.text(
      "Debemos entender casos anteriores de sismos en el Perú",
      margen,
      y
    );

    y += 12;

    pdf.setFont("helvetica", "normal");

    const lineas = pdf.splitTextToSize(
      this.contenido.teoria,
      170
    );

    pdf.text(
      lineas,
      margen,
      y
    );

    y += lineas.length * 7 + 15;

    pdf.setFontSize(10);

    pdf.text(
      "Generado automáticamente por APU",
      margen,
      y
    );

    pdf.save("Teoria_APU.pdf");

  }

  toggleAltoContraste(): void {

    this.altoContraste = !this.altoContraste;

  }

  aumentarFuente(): void {

  if (this.tamanoFuente < 28) {

    this.tamanoFuente += 2;

  }

}

disminuirFuente(): void {

  if (this.tamanoFuente > 12) {

    this.tamanoFuente -= 2;

  }

}

restablecerFuente(): void {

  this.tamanoFuente = 16;

}
}