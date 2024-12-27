import { Routes } from '@angular/router';

import { SidebarComponent } from './pages/sidebar/sidebar.component';

export const routes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    // canActivate: [navigatorGuard],
    // canActivate: [authGuard, navigatorGuard], //? activar antes de subir a prod
    children: [
      {
        path: '',
        redirectTo: 'pagar-facturas',
        pathMatch: 'full',
      },
      {
        path: 'no-encontrado',
        loadComponent: () =>
          import('./pages/no-encontrado/no-encontrado.component').then(
            (m) => m.NoEncontradoComponent
          ),
      },
      {
        path: 'pagar-facturas',
        loadComponent: () =>
          import('./pages/pagar-facturas/pagar-facturas.component').then(
            (m) => m.PagarFacturasComponent
          ),
      },
      {
        path: 'historial-pagos',
        loadComponent: () =>
          import('./pages/historial-pagos/historial-pagos.component').then(
            (m) => m.HistorialPagosComponent
          ),
      },
      {
        path: 'comprobante',
        loadComponent: () =>
          import('./pages/comprobante/comprobante.component').then(
            (m) => m.comprobanteComponent
          ),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'navegador-no-permitido',
    loadComponent: () =>
      import(
        './pages/navegador-no-permitido/navegador-no-permitido.component'
      ).then((m) => m.NavegadorNoPermitidoComponent),
  },
  {
    path: '**',
    redirectTo: 'no-encontrado',
  },
];
