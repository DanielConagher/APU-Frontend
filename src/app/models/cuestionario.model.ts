import { Pregunta } from "./pregunta.model";

export interface Cuestionario {

    idCuestionario: number;

    experienciaGanada: number;

    retroalimentacion: string;

    tipo: string;

    numDesastres: number;

    preguntas: Pregunta[];

}