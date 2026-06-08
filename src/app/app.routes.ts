import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { HomeComponent } from './pages/home/home';
import { AprendizajeComponent } from './pages/aprendizaje/aprendizaje';
import { MapaAprendizajeComponent } from './pages/mapa/mapa';
import { TheoryContentComponent } from './pages/theory-content/theory-content';
import { MochilaEmergenciaComponent } from './pages/mochila-emergencia/mochila-emergencia';
import { ConfiguracionComponent } from './pages/configuracion/configuracion';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'aprendizaje',
    component: AprendizajeComponent
  },
  {
    path: 'mapa-aprendizaje/:idTipoDesastre',

    component:
      MapaAprendizajeComponent
  },
  {
    path:
      'contenido/:idContenido/:idTipoDesastre',

    component:
      TheoryContentComponent
  },
  {
    path: 'mochila',
    component: MochilaEmergenciaComponent
  },
  {
    path: 'configuracion',
    component: ConfiguracionComponent
  },
  {
  path: 'aprendizaje/:idTipoDesastre',
  component: AprendizajeComponent
}

];