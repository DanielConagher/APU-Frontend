import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';

@Component({

  selector: 'app-admin-layout',

  standalone: true,

  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],

  templateUrl: './admin-layout.html',

  styleUrls: [
    './admin-layout.css'
  ]

})
export class AdminLayout {
  constructor(
    private router: Router
  ) { }

  cerrarSesion() {

    localStorage.clear();

    this.router.navigate(['/login']);

  }
}
