export interface Comentario {
  comentario: string;
  estudiante: string;
}

export interface Contenido {
  teoria: string;
  imagenes: string[];
  videos: string[];
  comentarios: Comentario[];
}