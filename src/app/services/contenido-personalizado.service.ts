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
    ContenidoPersonalizado
} from '../models/contenido-personalizado.model';


@Injectable({
    providedIn: 'root'
})
export class ContenidoPersonalizadoService {


    private api =
    'http://localhost:8080/contenido-personalizado';


    constructor(
        private http: HttpClient
    ){}



    obtenerContenido(
        idContenido:number
    ):Observable<ContenidoPersonalizado>{


        return this.http.get<ContenidoPersonalizado>(
            `${this.api}/${idContenido}`
        );


    }


}