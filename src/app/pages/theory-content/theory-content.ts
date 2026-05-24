import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContenidoService } from '../../services/contenido.service';
import { Contenido } from '../../models/contenido.model';
import { SafePipe } from '../../pipes/safe-pipe';

@Component({
  selector: 'app-theory-content',
  standalone: true,
  imports: [CommonModule,
    SafePipe
  ],
  templateUrl: './theory-content.html',
  styleUrls: ['./theory-content.css']
})
export class TheoryContentComponent
implements OnInit {

  contenido?: Contenido;

  constructor(
    private contenidoService: ContenidoService
  ) {}

  ngOnInit(): void {

    this.contenidoService
      .getContenido()
      .subscribe(data => {

        this.contenido = data;

      });
  }
}
