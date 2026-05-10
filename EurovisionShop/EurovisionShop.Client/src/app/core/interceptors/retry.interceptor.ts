import {
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';

import { throwError } from 'rxjs';

import {
  retry,
  catchError
} from 'rxjs/operators';

export const retryInterceptor: HttpInterceptorFn = (req, next) => {

  return next(req).pipe(

    retry({
      count: 15,
      delay: 1000
    }),

    catchError((error: HttpErrorResponse) => {

      console.error('HTTP Error:', error);

      return throwError(() => error);
    })
  );
};
