export interface RegisterRequest {

  primerNombre: string;
  segundoNombre: string;

  primerApellido: string;
  segundoApellido: string;

  edad: number;
  esPadre: boolean;

  idUbicacion: number;

  correo: string;
  contrasena: string;

  discapacidades: number[];

}