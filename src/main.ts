import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { CoursesService } from './app/services/courses.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    CoursesService,
    provideHttpClient(withInterceptorsFromDi())
  ]
}).catch(err => console.log(err));
