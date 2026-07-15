import { Injectable } from '@angular/core';

import {
    HttpClient,
    HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { Cuestionario } from '../models/cuestionario.model';

import {
    ResolverCuestionario
} from '../models/resolver-cuestionario.model';

import {
    ResultadoCuestionario
} from '../models/resultado-cuestionario.model';

@Injectable({
    providedIn: 'root'
})
export class CuestionarioService {

    private api =
        'http://localhost:8080/cuestionarios';

    constructor(
        private http: HttpClient
    ) { }

    /**
     * Obtiene el cuestionario asociado a un contenido.
     */
    obtenerCuestionario(
        idContenido: number
    ): Observable<Cuestionario> {

        const token =
            localStorage.getItem(
                'token'
            );

        return this.http.get<Cuestionario>(
            `${this.api}/contenido/${idContenido}`,
            {
                headers: new HttpHeaders({
                    Authorization:
                        `Bearer ${token}`
                })
            }
        );
    }

    /**
     * Envía las respuestas del estudiante al backend.
     */
    resolverCuestionario(
        request: ResolverCuestionario
    ): Observable<ResultadoCuestionario> {

        const token =
            localStorage.getItem(
                'token'
            );

        return this.http.post<ResultadoCuestionario>(
            `${this.api}/resolver`,
            request,
            {
                headers: new HttpHeaders({
                    Authorization:
                        `Bearer ${token}`
                })
            }
        );
    }

}