import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Router,
  RouterModule
} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  nombreCompleto = '';

  mostrarMenu = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {

    this.cargarNombre();

  }

  private cargarNombre() {

    this.nombreCompleto =
      localStorage.getItem(
        'nombreCompleto'
      ) ?? 'Usuario';

  }

  cerrarSesion(): void {

    localStorage.clear();

    this.router.navigate([
      '/login'
    ]);

  }

  toggleMenu(): void {

    this.mostrarMenu = !this.mostrarMenu;

    console.log(
      'mostrarMenu:',
      this.mostrarMenu
    );

  }

}