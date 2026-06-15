import { enableProdMode, provideZonelessChangeDetection } from '@angular/core';
import { environment } from './environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app/app.routes';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideZonelessChangeDetection(),
    provideHttpClient()
  ]
}).catch(err => console.log(err));
