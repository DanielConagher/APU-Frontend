import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';


import {
  CommonModule
} from '@angular/common';


import {
  ActivatedRoute,
  Router
} from '@angular/router';


import {
  Navbar
} from '../../components/navbar/navbar';


import {
  FooterComponent
} from '../../components/footer/footer';


import {
  ContenidoPersonalizadoService
} from '../../services/contenido-personalizado.service';


import {
  ProgresoPersonalizadoService
} from '../../services/progreso-personalizado.service';


import {
  ContenidoPersonalizado
} from '../../models/contenido-personalizado.model';


import {
  SafePipe
} from '../../pipes/safe-pipe';


import {
  jsPDF
} from 'jspdf';



@Component({

  selector:
    'app-contenido-personalizado',

  standalone: true,

  imports: [

    CommonModule,
    Navbar,
    FooterComponent,
    SafePipe

  ],

  templateUrl:
    './contenido-personalizado.html',

  styleUrl:
    './contenido-personalizado.css'

})


export class ContenidoPersonalizadoComponent
  implements OnInit, OnDestroy {



  contenido?: ContenidoPersonalizado;


  idContenido!: number;



  altoContraste = false;

  tamanoFuente = 16;



  leyendo = false;

  pausado = false;


  private utterance?: SpeechSynthesisUtterance;



  constructor(

    private service: ContenidoPersonalizadoService,

    private progresoService: ProgresoPersonalizadoService,

    private route: ActivatedRoute,

    private router: Router

  ) { }




  ngOnInit(): void {


    this.idContenido =
      Number(
        this.route.snapshot.paramMap.get(
          'idContenido'
        ));


    this.cargarContenido();


  }




  cargarContenido() {


    this.service
      .obtenerContenido(
        this.idContenido
      )
      .subscribe(data => {


        this.contenido = data;


      });


  }






  volver() {


    const idTipoDesastre =
      Number(
        this.route.snapshot.paramMap.get(
          'idTipoDesastre'
        ));


    this.router.navigate([

      '/mapa-aprendizaje',

      idTipoDesastre

    ]);


  }






  siguiente() {


    this.progresoService
      .completarContenido(
        this.idContenido
      )
      .subscribe(() => {


        const idTipoDesastre =
          Number(
            this.route.snapshot.paramMap.get(
              'idTipoDesastre'
            ));


        this.router.navigate([

          '/mapa-aprendizaje',

          idTipoDesastre

        ]);


      });


  }






  leerTeoria() {


    if (!this.contenido?.teoria)
      return;


    speechSynthesis.cancel();


    this.utterance =
      new SpeechSynthesisUtterance(
        this.contenido.teoria
      );



    this.utterance.lang = 'es-PE';

    this.utterance.rate = 0.95;



    this.utterance.onstart = () => {

      this.leyendo = true;
      this.pausado = false;

    };


    this.utterance.onend = () => {

      this.leyendo = false;

    };



    speechSynthesis.speak(
      this.utterance
    );


  }




  pausarLectura() {

    speechSynthesis.pause();

    this.pausado = true;

  }




  reanudarLectura() {

    speechSynthesis.resume();

    this.pausado = false;

  }




  detenerLectura() {

    speechSynthesis.cancel();

    this.leyendo = false;

    this.pausado = false;

  }




  toggleAltoContraste() {

    this.altoContraste =
      !this.altoContraste;

  }




  aumentarFuente() {

    if (this.tamanoFuente < 28)
      this.tamanoFuente += 2;

  }



  disminuirFuente() {

    if (this.tamanoFuente > 12)
      this.tamanoFuente -= 2;

  }



  restablecerFuente() {

    this.tamanoFuente = 16;

  }



  ngOnDestroy() {

    speechSynthesis.cancel();

  }



}