import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

export interface Ubicacion {

    idUbicacion: number;

    nombre: string;

}

@Injectable({
    providedIn: 'root'
})
export class UbicacionService {

    private api = 'http://localhost:8080/ubicaciones';

    constructor(private http: HttpClient) { }

    obtenerUbicaciones() {

        return this.http.get<Ubicacion[]>(this.api);

    }

}