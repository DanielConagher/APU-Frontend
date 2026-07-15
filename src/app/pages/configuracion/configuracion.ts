import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../components/navbar/navbar';
import { FooterComponent } from '../../components/footer/footer';
import { Discapacidad } from '../../models/discapacidad';

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

  discapacidades: Discapacidad[] = [];

  idsDiscapacidades: number[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.cargarPerfil();
    this.cargarUbicaciones();
    this.cargarDiscapacidades();
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
        this.idsDiscapacidades = data.idsDiscapacidades;
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
        idUbicacion: this.idUbicacion,
        //La lista de discapacidades asociadas al estudiante.
        idsDiscapacidades:
          this.idsDiscapacidades
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

  cargarDiscapacidades() {

    this.http.get<any[]>(

      'http://localhost:8080/discapacidades'

    ).subscribe(data => {

      this.discapacidades = data;

    });

  }

  // Metodo que se activa al marcar o desmarcar una discapacidad.
  toggleDiscapacidad(id: number) {
    //Si desmarcamos una discapacidad, la eliminamos del arreglo idsDiscapacidades.
    if (this.idsDiscapacidades.includes(id)) {

      this.idsDiscapacidades =

        this.idsDiscapacidades.filter(

          x => x !== id

        );

    }
    //Si la marcamos, significa que no estaba en el arreglo idsDiscapacidades, entonces la agregamos.
    else {

      this.idsDiscapacidades.push(id);

    }

  }
}