import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const navigatorGuard: CanActivateFn = (route, state) => {
  const userAgent: any = navigator.userAgent;
  const router = inject(Router);

  if (
    !userAgent.includes('Chrome') &&
    state.url !== '/navegador-no-permitido'
  ) {
    router.navigate(['/navegador-no-permitido']);
    return false;
  }

  return true;
};
