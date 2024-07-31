import { inject } from '@angular/core';
import { getDateShort } from '@utilities/date.util';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = route.queryParamMap.get('token');
  const nombre = route.queryParamMap.get('nombre');

  if (token && nombre) {
    localStorage.setItem('token', token);
    localStorage.setItem('nombre', nombre);
    localStorage.setItem('fecha', getDateShort());

    router.navigate(['/pagar-facturas']);
  } else {
    const localToken = localStorage.getItem('token');
    const localNombre = localStorage.getItem('nombre');
    const localFecha = localStorage.getItem('fecha');

    if (!localToken || !localNombre || !localFecha) {
      window.location.assign('https://www.garantiascomunitarias.com');
      return false;
    }
  }

  return true;
};
