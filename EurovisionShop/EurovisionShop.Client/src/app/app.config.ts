import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

import { provideRouter } from '@angular/router';

import {
  provideHttpClient,
  withFetch,
  withInterceptors
} from '@angular/common/http';

import { provideClientHydration } from '@angular/platform-browser';

import { retryInterceptor } from './core/interceptors/retry.interceptor';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {

  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(

      withFetch(),

      withInterceptors([
        retryInterceptor
      ])
    ),
    provideClientHydration()
  ]
};
