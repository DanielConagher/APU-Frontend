export interface RespuestaUsuario {

    idPregunta: number;

    idRespuestaSeleccionada: number;

}

export interface ResolverCuestionario {

    idCuestionario: number;

    idContenido: number;

    respuestas: RespuestaUsuario[];

}