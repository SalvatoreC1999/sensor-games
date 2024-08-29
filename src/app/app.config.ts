import {
  ApplicationConfig,
  ApplicationRef,
  Injector,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";
import {DialogService} from "primeng/dynamicdialog";
import {DOCUMENT} from "@angular/common";
import {provideLottieOptions} from "ngx-lottie";
import player from 'lottie-web';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideLottieOptions({
      player: () => player,
    }),
    {
    provide: DialogService,
    useFactory: (appRef: ApplicationRef, injector: Injector, document: Document) => {
      return new DialogService(appRef, injector, document);
    },
    deps: [ApplicationRef, Injector, DOCUMENT]
  }
  ]
};
