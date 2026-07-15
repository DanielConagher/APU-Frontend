import { Injectable } from '@angular/core';

import {
    HttpClient
} from '@angular/common/http';

import {
    Observable
} from 'rxjs';
import { RegisterRequest } from '../models/register-request';
import { AuthResponse } from '../models/auth-response';

import { Discapacidad } from '../models/discapacidad';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl =
        'http://localhost:8080/auth';

    constructor(
        private http: HttpClient
    ) { }

    login(
        request: any
    ): Observable<any> {

        return this.http.post(

            `${this.apiUrl}/login`,

            request
        );
    }

    registrar(request: RegisterRequest) {

        return this.http.post<AuthResponse>(

            `${this.apiUrl}/register`,

            request

        );
    }

    obtenerDiscapacidades() {

        return this.http.get<Discapacidad[]>(

            'http://localhost:8080/discapacidades'

        );

    }
}