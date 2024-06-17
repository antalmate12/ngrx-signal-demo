import { NgHttpCachingConfig } from './../../node_modules/ng-http-caching/lib/ng-http-caching.service.d';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { NgHttpCachingModule } from 'ng-http-caching';

const ngHttpCachingConfig: NgHttpCachingConfig = {
  lifetime: 1000 * 10 // 10 seconds
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideStore(),
    provideHttpClient(withFetch()),
    importProvidersFrom([
      NgHttpCachingModule.forRoot(ngHttpCachingConfig),
    ]),
  ],
};
