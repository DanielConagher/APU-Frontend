import { Respuesta } from "./respuesta.model";

export interface Pregunta {

    idPregunta: number;

    descripcion: string;

    respuestas: Respuesta[];

}