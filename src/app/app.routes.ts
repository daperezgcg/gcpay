import { Routes } from '@angular/router';
import { authGuard } from '@guards/auth.guard';
import { SidebarComponent } from './pages/sidebar/sidebar.component';

export const routes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'pagar-facturas',
        pathMatch: 'full',
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
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
