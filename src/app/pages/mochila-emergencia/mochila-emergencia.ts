import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../components/navbar/navbar';
import { FooterComponent } from '../../components/footer/footer';

@Component({
  selector: 'app-mochila-emergencia',
  standalone: true,
  imports: [CommonModule, Navbar, FooterComponent],
  templateUrl: './mochila-emergencia.html',
  styleUrl: './mochila-emergencia.css'
})
export class MochilaEmergenciaComponent {}