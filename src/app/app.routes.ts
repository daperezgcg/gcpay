import { Routes } from '@angular/router';
import { SidebarComponent } from './pages/sidebar/sidebar.component';

export const routes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    // canActivate: [authGuard],
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
          import('./pages/pagar-facturas/pago-de-facturas.component').then(
            (m) => m.PagodeFacturasComponent
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
      {
        path: 'pagar-prueba',
        loadComponent: () =>
          import(
            './pages/pagar-facturas-test/pagar-facturas-test.component'
          ).then((m) => m.PagarFacturasTestComponent),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '**',
    redirectTo: 'no-encontrado',
  },
];
