import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';

/*
   INTERCEPTOR PARA AGREGAR EL TOKEN DE AUTENTICACIÓN AL ENCABEZADO DE LA PETICIÓN,
   TAMBIEN VALIDA QUE LA RESPUESTA DEL SERVIDOR SEA 1,
   EN CASO CONTRARIO VACIA EL LOCAL STORAGE Y REDIRIGE A LA PAGINA DE GARANTIAS COMUNITARIAS
*/

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const body = req.body as FormData;

  try {
    body.append('token', localStorage.getItem('token') + '');
  } catch (error) {}

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status == 401) {
        localStorage.clear();
        // window.location.assign('https://www.garantiascomunitarias.com');
      }
      throw Error;
    })
  );
};
