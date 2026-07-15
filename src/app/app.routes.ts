import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { HomeComponent } from './pages/home/home';
import { AprendizajeComponent } from './pages/aprendizaje/aprendizaje';
import { MapaAprendizajeComponent } from './pages/mapa/mapa';
import { TheoryContentComponent } from './pages/theory-content/theory-content';
import { MochilaEmergenciaComponent } from './pages/mochila-emergencia/mochila-emergencia';
import { ConfiguracionComponent } from './pages/configuracion/configuracion';
import { CuestionarioComponent } from './pages/cuestionario/cuestionario';
import { AdminContenidosComponent } from './pages/admin-contenidos/admin-contenidos';
import { ZonaSeguraComponent } from './pages/zona-segura/zona-segura';
import { ContenidoPersonalizadoComponent }
  from './pages/contenido-personalizado/contenido-personalizado';

import { AdminUsuarios }
  from './pages/admin-usuarios/admin-usuarios';

import { AdminEstadisticas }
  from './pages/admin-estadisticas/admin-estadisticas';

import { AdminPerfil }
  from './pages/admin-perfil/admin-perfil';

import { AdminLayout }
  from './pages/admin-layout/admin-layout';

import { AdminDashboard }
  from './pages/admin-dashboard/admin-dashboard';

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
    path:
      'cuestionario/:idContenido/:idTipoDesastre',

    component:
      CuestionarioComponent
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
  },
  {
    path: 'admin',

    component: AdminLayout,

    children: [

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },


      {
        path: 'dashboard',
        component: AdminDashboard
      },
      {
        path: 'resumen-ia',
        component: AdminContenidosComponent
      },
      {
        path: 'usuarios',
        component: AdminUsuarios
      },
      {
        path: 'estadisticas',
        component: AdminEstadisticas
      },


      {
        path: 'perfil',
        component: AdminPerfil
      },

    ]

  },
  {
    path: 'zonas-seguras',
    component: ZonaSeguraComponent
  },

  {
    path:
      'contenido-personalizado/:idContenido/:idTipoDesastre',

    component:
      ContenidoPersonalizadoComponent
  },


];