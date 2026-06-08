import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../components/navbar/navbar';
import { FooterComponent } from '../../components/footer/footer';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.html',
  styleUrls: ['./configuracion.css'],
  imports: [
    CommonModule,
    FormsModule,
    Navbar,
    FooterComponent
  ]
})
export class ConfiguracionComponent implements OnInit {

  // ===== ERRORES =====
  errores: any = {};

  // ===== FORM =====
  nombre = '';
  segundoNombre = '';
  primerApellido = '';
  segundoApellido = '';
  correo = '';
  idUbicacion!: number;

  // ===== DATA =====
  ubicaciones: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarPerfil();
    this.cargarUbicaciones();
  }

  // ===== HEADERS JWT =====
  get headers() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    };
  }

  // ===== PERFIL =====
  cargarPerfil() {
    this.http.get<any>('http://localhost:8080/perfil', this.headers)
      .subscribe(data => {
        this.nombre = data.primerNombre;
        this.segundoNombre = data.segundoNombre;
        this.primerApellido = data.primerApellido;
        this.segundoApellido = data.segundoApellido;
        this.correo = data.correo;
        this.idUbicacion = data.idUbicacion;
      });
  }

  // ===== UBICACIONES =====
  cargarUbicaciones() {
    this.http.get<any[]>('http://localhost:8080/ubicaciones')
      .subscribe(data => {
        this.ubicaciones = data;
      });
  }

  // ===== GUARDAR =====
  guardar() {

    this.errores = {}; // limpia errores antes de enviar

    this.http.put<any>(
      'http://localhost:8080/perfil',
      {
        primerNombre: this.nombre,
        segundoNombre: this.segundoNombre,
        primerApellido: this.primerApellido,
        segundoApellido: this.segundoApellido,
        correo: this.correo,
        idUbicacion: this.idUbicacion
      },
      this.headers
    ).subscribe({

      next: () => {
        alert('Perfil actualizado correctamente');
      },

      error: (err: any) => {
        this.errores = err.error || {};
      }

    });
  }
}