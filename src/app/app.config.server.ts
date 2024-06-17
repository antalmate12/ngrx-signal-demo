import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    // Oh shit, it actually works
    provideServerRendering()
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
