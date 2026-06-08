import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  nombreCompleto = '';

  ngOnInit(): void {
    this.cargarNombre();
  }

  private cargarNombre() {
    this.nombreCompleto =
      localStorage.getItem('nombreCompleto') ?? 'Usuario';
  }
}