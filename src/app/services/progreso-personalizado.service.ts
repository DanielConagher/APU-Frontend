import {
    Injectable
} from '@angular/core';

import {
    HttpClient
} from '@angular/common/http';


@Injectable({
    providedIn:'root'
})
export class ProgresoPersonalizadoService{


    private api =
    'http://localhost:8080/progreso-personalizado';



    constructor(
        private http:HttpClient
    ){}



    completarContenido(
        idContenido:number
    ){

        const token =
        localStorage.getItem('token');


        return this.http.post(
            `${this.api}/completar/${idContenido}`,
            {},
            {
                headers:{
                    Authorization:
                    `Bearer ${token}`
                }
            }
        );

    }

}