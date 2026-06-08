import {
    Injectable
} from '@angular/core';

import {
    HttpClient
} from '@angular/common/http';

import {
    Observable
} from 'rxjs';

import {
    MapaAprendizaje
} from '../models/mapa-aprendizaje';

@Injectable({
    providedIn: 'root'
})
export class MapaService {

    private api =
        'http://localhost:8080/mapa';

    constructor(
        private http: HttpClient
    ) { }

    obtenerMapa(
        idTipoDesastre: number
    ): Observable<MapaAprendizaje[]> {

        const token =
            localStorage.getItem(
                'token'
            );

        return this.http.get<
            MapaAprendizaje[]
        >(
            `${this.api}/${idTipoDesastre}`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );
    }
}